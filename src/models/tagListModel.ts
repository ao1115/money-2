const localStorageName = 'tagList'
//将name作为id
type Tag = {
    id: string,
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
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
        //这个时候data是个对象  {"id":"1","name":"1";"id":"2","name":"2"}
        //没有办法直接this.data.indexOf(name)这样取到
        //先把所有的name保存到names里面
        const names = this.data.map(item => item.name)
        if (names.indexOf(name) >= 0) { return 'duplicated'; }
        this.data.push({ id: name, name: name });
        this.save();
        return 'success';
    },
    //保存数据
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    }
}
export default tagListModel