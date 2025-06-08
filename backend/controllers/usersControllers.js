import {
      userCreateModel,
      userVerifyModel,
      userGetAllModel,
      userDeleteModel,
      userDeleteFullModel,
      restoreUserModel
      } from '../models/usersModels.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function userCreate(req, res, next) {
      const {name, last_name, email, status, password} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      
      if(!name || !last_name || !email || !password) {
            return res.status(400).json({message: "Incomplete user data."})
      }

      const setStatus = status || "user"

      try {

            const salt = await bcrypt.genSalt(8)
            const password_h = await bcrypt.hash(password, salt)   

            await userCreateModel({
                  name,
                  last_name,
                  email,
                  status: setStatus,
                  password_h
            })

            res.status(201).json({message: `User ${name} was created.`})
      }
      catch (error) {
            if (error.code === '23505') {
                  return res.status(409).json({message: "Email already exists.", code: "23505"})
            }
            next(error)
      }
}

async function userLogin(req, res, next) {
      const {email, password} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!email || !password) {
            return res.status(400).json({message: "Wrong login data."})
      }

      
      try {
            const {id, status, password_h} = await userVerifyModel({email})
            
            if (!id) {
                  return res.status(401).json({message: "User not found."})
            }
            
            if (status === "deleted") {
                  return res.status(401).json({message: "User was removed."})
            }
            const verify = await bcrypt.compare(password, password_h)

            if (!verify) {
                  return res.status(401).json({message: "Wrong password."})
            }

            const token = jwt.sign(
                  {id, email, status},
                  process.env.JWT_SECRET)

            res.status(200).json({token})
      }
      catch (error) {
            next(error)
      }
}

async function getAllUsers(req, res, next) {
  
      try {
            const users = await userGetAllModel()
            res.status(200).json(users)
      }
      catch (error) {
            next(error)
      }
}

async function userDelete(req, res, next) {
      const {userId} = req.params
      console.log(`req.body: ${JSON.stringify(req.params)}`)

        if (!userId) {
            return res.status(400).json({message: "No user id."})
      }

      try {
            await userDeleteModel({userId})
            res.status(200).json({message: "user deleted (soft)"})
      }
      catch (error) {
            next(error)
      }
}

async function userDeleteFull(req, res, next) {
      const {userId} = req.params
          console.log(`req.body: ${JSON.stringify(req.params)}`)

        if (!userId) {
            return res.status(400).json({message: "No user id."})
      }

      try {
            await userDeleteFullModel({userId})
            res.status(200).json({message: "user deleted"})
      }
      catch (error) {
            next(error)
      }
}

async function restoreUser(req, res, next) {
      const {userId} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!userId) {
            return res.status(400).json({message: "Invalid user Id"})
      }

      try {
            await restoreUserModel({userId})
            res.status(200).json({message: "user restored"})
      }
      catch (error) {
            next(error)
      }
}

export {userCreate, userLogin, userDelete, userDeleteFull, getAllUsers, restoreUser}