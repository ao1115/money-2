import tagListModel from "@/models/tagListModel";
import store from "./index2";

export default {
    //tag store
    tagList: tagListModel.fetch(),
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === "duplicated") {
            window.alert("标签名重复了");
        } else if (message === "success") {
            window.alert("添加成功");
        }
    },
    findTag: (id: string) => {
        return (store.tagList.filter(tag => tag.id === id)[0]);
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id)
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },

}