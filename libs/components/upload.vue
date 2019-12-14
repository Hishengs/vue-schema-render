<template>
  <div class="vsr_component_upload">
    <div class="image-preview" :style="imageStyle" v-if="type === 'image'">
      <div class="hint">
        <el-button class="el-icon-upload2" @click="upload"></el-button>
        <p class="tip">click to upload</p>
      </div>
    </div>
    <div class="video-preview" v-else-if="type === 'video'">
      <video :src="component.value" controls width="100%" height="150"></video>
      <div class="hint">
        <el-button class="el-icon-upload2" @click="upload"></el-button>
        <p class="tip">click to upload</p>
      </div>
    </div>
    <!-- resource url -->
    <el-input
      placeholder="resource url"
      v-model="component.value"
      v-if="type === 'video'"
    >
      <!-- <el-button slot="append" class="el-icon-upload2" @click="upload"></el-button> -->
    </el-input>
  </div>
</template>

<script>
import cloudinary from 'cloudinary';
import baseMixin from "./base.mixin";
import { COMP_PREFIX } from "../utils";

const commonCloudinaryOptions = {
  cloud_name: "****",
  multiple: false,
  folder: "cms",
  tags: [],
  sources: ["local"]
};
const cloudinaryImgOptions = {
  upload_preset: "****",
  max_file_size: 4000000, // 4M
  max_image_width: 3000
};
const cloudinaryVideoOptions = {
  upload_preset: "****",
  folder: "cms/video",
  resource_type: "video",
  max_file_size: 50000000 // 50M
};

export default {
  name: `${COMP_PREFIX}-upload`,
  mixins: [baseMixin],
  props: {
    // resource type
    type: {
      type: String,
      validator: (type) => {
        return ['image', 'video'].includes(type);
      },
      default: "image"
    },
    // width of image
    width: {
      type: Number
    },
    // height of image
    height: {
      type: Number
    },
    // support extensions
    extensions: {
      type: Array
    },
    // max size of resource, kb
    maxSize: {
      type: Number
    }
  },
  computed: {
    imageStyle() {
      return this.component.value
        ? {
          backgroundImage: `url(${this.component.value})`
        }
        : {};
    }
  },
  methods: {
    upload(component) {
      const options = Object.assign(
        {},
        commonCloudinaryOptions,
        this.type === "image" ? cloudinaryImgOptions : cloudinaryVideoOptions,
        this.component.cloudinaryOptions || {}
      );
      window.cloudinary.openUploadWidget(options, (err, result) => {
        if (err) {
          this.$message.error(err.message);
        } else {
          if (result && result.event === 'success') {
            const { info } = result;
            if (info.width > 1920) {
              info.width = 1920;
            }
            const width = `w_${info.width}`;
            const height = "";
            const blur = "";
            // don't use klook-res.cloudinary.com
            let { url } = info;
            const params = `/fl_lossy.progressive,q_85/c_fill,${blur},${width},${height}`;
            url = url.replace(/upload/, `upload${params}`);
            url = url.replace("http", "https");
            this.component.value = url;
            this.onChange(this.component);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.vsr_component_upload {
  display: inline-block;
  background-color: white;
  width: 300px;
  .image-preview,
  .video-preview {
    position: relative;
    height: 150px;
    background-size: cover;
    margin-bottom: 10px;
    border: 1px solid #eee;
    .hint {
      position: absolute;
      left: 0;
      right: 0;
      top: 25px;
      width: 100%;
      text-align: center;
      .el-button {
        background-color: transparent;
        border-radius: 0;
        border: none;
      }
      .tip {
        font-size: 12px;
        margin: 0;
      }
    }
  }
  .el-input {
    width: 100%;
  }
}
</style>
