declare module "@api.Restaurant" {
  // RICEPO逻辑(minimum maximum 相关判断逻辑):
  // minimum == 0 && maximum > 0 最多选max个
  // minimum > 0 && maximum == 0 最少选min个
  // minimum > 0 && maximum == minimum 一定要选择min个，不能少也不能多（必选）
  // minimum > 0 && maximum > minimum 选择 minimum ～ maximum 个 不能少于min也不能多于max
  type GetDishOptionResObj = {
    product_id: number;
    id: number;
    ref_id: string;
    merchant_product_extra_id: number;
    name_zh: string;
    name: string;
    name_en: string;
    name_zht: string;
    minimum: number;
    maximum: number;
    option_required: boolean;
    option_single: boolean;
    rec_create_time: Date;
    rec_update_time: Date;
    items: {
      id: number;
      ref_id: string;
      merchant_product_extra_options_id: number;
      name_zh: string;
      name_en: string;
      name_zht: string;
      name: string;
      price: number;
      popularity: number | null;
      /** 是否可选 */
      available: boolean;
      rec_create_time?: any;
      rec_update_time?: any;
    }[];
  }[];
}
