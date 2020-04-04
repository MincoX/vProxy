<template>
    <div id="upload_img" @click="headerClick">
        <input type="file" id="upload" ref="fileBtn" @change="uploadImg" />
        <img v-if="imgSrc" :src="imgSrc" class="img img-circle uploadImg" ref="img" />
        <img
            v-if="!imgSrc"
            :src="header?header:'static/img/user2-160x160.jpg'"
            class="img img-circle uploadImg"
            ref="img"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgInfo: null,
            imgSrc: null
        };
    },
    watch: {
        imgSrc: function() {
            this.$emit('uploadImg', this.imgSrc)
        },
    },  
    props: ["header"],
    methods: {
        headerClick() {
            document.getElementById("upload").click();
        },
        async uploadImg() {
            var that = this;
            const inputFile = await this.$refs.fileBtn.files[0];
            let res;
            this.inputFile = inputFile;
            if (this.inputFile) {
                let inputFile = this.inputFile;
                if (
                    inputFile.type !== "image/jpeg" &&
                    inputFile.type !== "image/png" &&
                    inputFile.type !== "image/gif"
                ) {
                    this.$notify({
                        title: "不是有效的图片文件！",
                        type: "warning"
                    });
                    return;
                }
                this.imgInfo = Object.assign({}, this.imgInfo, {
                    name: inputFile.name,
                    size: inputFile.size,
                    lastModifiedDate: inputFile.lastModifiedDate.toLocaleString()
                });
                const reader = new FileReader();
                res = reader.readAsDataURL(this.inputFile);
                reader.onloadend = function() {
                    var strBase64 = reader.result.substring(0);
                };
                reader.onload = function(e) {
                    console.log(e);
                    that.imgSrc = this.result;
                };
            } else {
                return;
            }
        }
    }
};
</script>

<style>
#upload_img {
    cursor: pointer;
}
#upload {
    display: none;
}
.uploadImg {
    width: 80px;
    height: 80px;
    margin-top: -72px;
}
</style>

