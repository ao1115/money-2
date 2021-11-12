//d.ts表示全局声明,不需要引用
//声明record的类型
type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型 object | string
    createdAt?: Date  // 类 / 构造函数
};
