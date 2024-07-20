interface ISku {
  id: string;
  code: string;
  name: string;
  price: number;
  stock: number;
}

interface ISkuForm {
  code: string;
  name: string;
  price: number;
  stock: number;
}