//El router base '/api/cart' 

const { Router } = require('express')

const routerCart = Router()

const { CartModel } = require('../../models/cartModel')
const { adminR } = require('../Admin')

//Firebase
const { ContenedorFirebase } = require('../../DB/ContenedorFirebase')
const CartFirebase = new ContenedorFirebase()



//a. POST: '/' - Crea un carrito y devuelve su id. 
routerCart.post('/', async(re, resp) => {
    try {
        const body = re.body;
        const cart = new ContenedorFirebase()
        const idCart = await cart.save(body)
        resp.status(200).json(idCart)
    } catch (err) {
        resp.status(500).json(err.message);
        throw new Error
    }
})


//b. DELETE: '/:id' - Vacía un carrito y lo elimina. 
routerCart.delete('/:id', async(req, resp) => {
    const id = req.params.id
    try {
        check = await CartFirebase.deleteById(id)
        resp.status(200).json({ check })
    } catch (err) {
        resp.status(500).json({ error: err.message });
        throw new Error
    }
})

//c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito 
routerCart.get('/:id/productos', async(req, resp) => {
    const idCart = req.params.id
    try {
        const mycart = await CartFirebase.getById(idCart)
        resp.status(200).json(mycart)
    } catch (err) {
        resp.status(500).json(err.message);
        throw new Error
    }
})

//d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito ( o de producto?) 
routerCart.post('/:id/productos', async(req, resp) => {
    const body = req.body
    const idCart = req.params.id
    try {
        const saved = await CartFirebase.saveProduct(idCart, body)
        if (!saved) {
            resp.json(`eL ${idCart} no existe`)
        }
        resp.status(200).json(saved)
    } catch (err) {
        resp.status(500).json(err.message);
        throw new Error
    }
})


//e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCart.delete('/:id/productos/:id_prod', async(req, resp) => {
    const idCart = req.params.id
    const idProd = req.params.id_prod
    try {
        const deleted = await CartFirebase.deleteProductById(idCart, idProd)
        if (!deleted) {
            resp.json("no se pudo eliminar el producto")
        } else {
            resp.json(mycart, "producto eliminado")
        }
    } catch (err) {
        resp.status(500).json(err.message);
        throw new Error
    }
})

module.exports = routerCart