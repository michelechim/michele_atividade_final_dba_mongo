import {
	index,
	show,
	store,
	update,
	remove,
	removeMany,
	filterPrice
}
	from '../app/controllers/produto.js'
import { Router } from 'express';

const routes = Router();
routes.get('/', index)
routes.get('/filter_price/', filterPrice)
routes.get('/:id', show)
routes.post('/', store)
routes.put('/:id', update)
routes.delete('/many/', removeMany)
routes.delete('/:id', remove)
export default routes;