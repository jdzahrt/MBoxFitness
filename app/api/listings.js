import apiClient from "./client";

const endpoint = "/listings";

const getListings = async () => {
    const listings = await apiClient.get(endpoint);

    return listings
}

const postListing = (listingData) => {
    const data = new FormData()
    data.append('title', listingData.title)
    data.append('price', listingData.price)
    data.append('categoryId', listingData.category.value)
    data.append('description', listingData.description)

    listingData.images.forEach((image, index) =>
        data.append('images', {
            name: 'image' + index, type: 'image/jpeg', uri: image
        }))

    if (listingData.location) data.append('location', JSON.stringify(listingData.location))

    return apiClient.post(endpoint, data, {
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: (progress) => console.log('pg', progress.loaded / progress.total)
    })

}

export default {
    getListings, postListing
}
