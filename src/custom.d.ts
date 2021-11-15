//d.ts表示全局声明,不需要引用
//声明record的类型
type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型 object | string
    createdAt?: Date  // 类 / 构造函数
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
interface Window {
    store: {
        tagList: Tag[]
        createTag: (name: string) => void
        removeTag: (id: string) => boolean
        updateTag: (id: string, name: string) => 'duplicated' | 'success' | 'not-found'
        findTag: (id: string) => Tag | undefined
        recordList: RecordItem[]
        createRecord: (record) => void
    }

}
