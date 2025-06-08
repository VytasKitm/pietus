import { 
      createAdvertModel,
      deleteAdvertModel,
      getAllAdvertsModel
      } from "../models/advertsModels.js";
import { createPhotoModel, getPhotosByIdModel } from "../models/photosModels.js";
import { searchModel } from "../models/searchModel.js";

async function createAdvert(req, res, next) {
      const { name, description, category_id, price, user_id, photos } = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!name || !description || !category_id || !price || !user_id) {
            return res.status(400).json({message: "Incomplete advert data."})
      }

      try {
            const advert_id = await createAdvertModel({
                                    name,
                                    description,
                                    category_id,
                                    price,
                                    user_id
                              })
            await Promise.all(
                  photos.map(photo_url => createPhotoModel({advert_id, photo_url}))
            )

            res.status(201).json({message: "Advert created sucessfuly"})
      }
      catch (error) {
            next(error)
      }
}

async function getAllAdverts(req, res, next) {

      try {
            const adverts = await getAllAdvertsModel()
            console.log(adverts)

            const advertsPhotos = await Promise.all(
                  adverts.map( async advert => {
                        const photo_urls = await getPhotosByIdModel(advert.id)
                        return { ...advert, photoUrls: photo_urls}
                  })
            )

            res.status(200).json(advertsPhotos)
      }
      catch (error) {
            res.status(400).json({message: `${error}`})
            next(error)
      }
}

async function searchAdverts(req, res, next) {
      let { search, category} = req.query

      try { 
            const adverts = await searchModel({search, category})
            console.log(adverts)
            const advertsPhotos = await Promise.all(
                  adverts.map( async advert => {
                        const photo_urls = await getPhotosByIdModel(advert.id)
                        return { ...advert, photoUrls: photo_urls}
                  })
            )
            res.status(200).json(advertsPhotos)
      }
      catch (error) {
            return res.status(400).json({message: `${error}`})
            // next(error)
      }
}


async function deleteAdvert(req, res, next) {
      const { id } = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!id) {
            return res.status(400).json({message: "No advert id."})
      }

      try {
            await deleteAdvertModel({id})

            res.status(200).json({message: `Advert id: ${id} was deleted`})
      }
      catch (error) {
            next(error)
      }
}

export { createAdvert, deleteAdvert, getAllAdverts, searchAdverts }