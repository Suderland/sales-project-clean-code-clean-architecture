import StockEntry from "../../domain/entity/StockEntry";

export default interface stockEntryRepository {
  save (stockEntry: StockEntry): Promise<void>;
  list (idProduct: number): Promise<StockEntry[]>;
}