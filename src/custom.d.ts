//d.ts表示全局声明,不需要引用
//声明record的类型
type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型 object | string
    createdAt?: string  // 类 / 构造函数
};
//将name作为id
type Tag = {
    id: string,
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'duplicated' | 'success'//success表示成功 duplicated表示失败.。联合类型
    update: (id: string, name: string) => 'duplicated' | 'success' | 'not-found'
    remove: (id: string) => boolean
    save: () => void
};
type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}
interface Window {
}
