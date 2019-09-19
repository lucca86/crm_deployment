const Pedidos = require('../models/Pedidos');

// Crear nuevos pedidos
exports.nuevoPedido = async(req, res, next) => {
    const pedido = await Pedidos(req.body);
    try {
        await pedido.save();
        res.json({ mensaje: 'Se agregó un nuevo pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los pedidos
exports.mostrarPedidos = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar un pedido por su ID
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });
    
    if(!pedido) {
        res.json({ mensaje: 'Ese pedido no existe'});
        return next();
    }
    // Mostrar el pedido
    res.json(pedido);
}

// Actualizar un Pedido
exports.actualizarPedido = async (req, res, next) => {

    try {
        const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido}, req.body, {
            new : true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar un pedido
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id: req.params.idPedido} );
        res.json({mensaje: 'El pedido se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
        
    }
}