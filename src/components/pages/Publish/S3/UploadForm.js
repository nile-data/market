import aws from 'aws-sdk'
import React from 'react'
import { useState } from 'react'
// import { useDownloadUrl } from '../../../@context/useDownloadUrl'

async function getPresignedURL(filename) {
  // This is so stupid but it's not like we were being secure anyways
  const NEXT_PUBLIC_ACCESS_KEY = 'AKIATB76YABHJDDMNNFP'
  const NEXT_PUBLIC_SECRET_KEY = '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'
  const NEXT_PUBLIC_REGION = 'us-west-1'
  const NEXT_PUBLIC_BUCKET_NAME = 'niledata-demo'

  /*
    Note that since we moved this code from the API section,
      we'll need to expose the environment variables to the
      browser using "NEXT_PUBLIC_". This is a *bad way to do things*
      and should be changed for production.
  */
  aws.config.update({
    accessKeyId: NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: NEXT_PUBLIC_SECRET_KEY,
    region: NEXT_PUBLIC_REGION,
    signatureVersion: 'v4'
  })

  const s3 = new aws.S3()

  // createPresignedPost() returns a hashmap which we'll need to objectify
  const post = await s3.createPresignedPost({
    Bucket: NEXT_PUBLIC_BUCKET_NAME,
    Fields: {
      key: filename
    },
    Expires: 60 // seconds
    // Conditions: [
    //   ['content-length-range', 0, 1048576], // up to 1 MB
    // ],
  })

  // Post is destructurable, so return it
  return post
}

export default function Upload() {
  // let urlToSet = "Loading...";
  const [downloadUrl, setDownloadUrl] = useState('(Select a file)')

  const uploadFile = async (e) => {
    setDownloadUrl('Loading...')
    const file = e.target.files[0]

    if (!(file === undefined)) {
      // getPresignedURL() returns a destructurable object
      const { url, fields } = await getPresignedURL(file.name)
      const formData = new FormData()

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const upload = await fetch(url, {
        method: 'POST',
        body: formData
      })

      if (upload.ok) {
        console.log('Uploaded successfully!')
      } else {
        console.error('Upload failed.')
      }

      setDownloadUrl(
        'https://niledata-demo.s3.us-west-1.amazonaws.com/' +
          encodeURIComponent(file.name)
      )
      console.log('Successfully set url')
    } else {
      setDownloadUrl('(Select a file)')
    }
  }

  return (
    <>
      <p>
        <i>(Optional) Need to store a file on our servers? Upload it here:</i>
      </p>
      <form method="post">
        <input type="file" onChange={uploadFile} />
      </form>
      <p>
        Your download URL (copy this into the "File" box below):{' '}
        <i>{downloadUrl}</i>
      </p>
    </>
  )
}
