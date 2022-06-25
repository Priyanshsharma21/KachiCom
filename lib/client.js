import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


export const client  = sanityClient({
    projectId : 'h6vivh22',
    dataset : 'production',
    apiVersion  : '2022-06-24',
    useCdn : true,
    token : process.env.NEXT_SANITY_PUBLIC_TOKEN
})

const builder = imageUrlBuilder(client);

export const urlFor = (source)=> builder.image(source)