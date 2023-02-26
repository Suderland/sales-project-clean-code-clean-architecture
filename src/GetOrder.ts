import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

export default class GetOrder {

	constructor (
		readonly orderRepository: OrderRepository = new OrderRepositoryDatabase()
	) {
	} 

	async execute (id: string): Promise<Output> {		
		const output: Output = {
			total: 0,
			freight: 0
		};
		const orderData = await this.orderRepository.getById(id);
		output.total = parseFloat(orderData.total);
		output.freight = parseFloat(orderData.freight);
		return output;
	}
}

type Output = {
	total: number,
	freight: number
}