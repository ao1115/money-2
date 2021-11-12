const localStorageName = 'tagList'
type TagListModel = {
    data: string[]
    fetch: () => {}
    create: (name: string) => 'duplicated' | 'success'//success表示成功 duplicated表示失败.。联合类型
    save: () => void
}
const tagListModel: TagListModel = {
    //得到初始化数据
    data: [],
    fetch() {
        this.data = JSON.parse(
            window.localStorage.getItem(localStorageName) || "[]");
        return this.data
    },
    create(name) {
        if (this.data.indexOf(name) >= 0) { return 'duplicated'; }
        this.data.push(name);
        this.save();
        return 'success';
    },
    //保存数据
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    }
}
export default tagListModel