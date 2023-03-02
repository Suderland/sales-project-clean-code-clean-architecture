import CouponRepository from "../../CouponRepository";
import CouponRepositoryDatabase from "../../CouponRepositoryDatabase";

export default class ValidateCoupon {

	constructor (
		readonly couponRepository: CouponRepository = new CouponRepositoryDatabase(),
	) {
	} 

	async execute (code: string): Promise<Boolean> {				
			const coupon = await this.couponRepository.getCoupon(code);
			return !coupon.isExpired(new Date());
		}
		
}
