<template>
  <div class="vsr_component_upload">
    <slot>
      <div class="upload-preview" :style="cStyle">
        <video :src="component.value" controls width="100%" v-if="type === 'video'"></video>
        <div class="image-hint" v-if="type === 'image' && !component.value">image</div>
        <!-- upload btn -->
        <el-button class="upload-btn" @click="upload" :disabled="isDisabled" :loading="uploading">
          {{ uploading ? 'uploading' : 'click to upload' }}
        </el-button>
      </div>
      <!-- resource url -->
      <el-input
        v-if="component.showResourceUrl"
        placeholder="resource url"
        v-model="component.value"
      >
        <!-- <el-button slot="append" class="el-icon-upload2" @click="upload"></el-button> -->
      </el-input>
      <!-- error -->
      <div class="error-text" v-if="errorText">{{ errorText }}</div>
    </slot>
  </div>
</template>

<script>
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX } from "../utils";

function loadCloudinary () {
  const s = document.createElement('script');
  s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
  s.type = 'text/javascript';
  document.head.appendChild(s);
}

if (typeof window !== 'undefined') {
  loadCloudinary();
}

const commonCloudinaryOptions = {
  cloud_name: "cloud_name",
  multiple: false,
  folder: "cms",
  tags: [],
  sources: ["local"]
};
const cloudinaryImgOptions = {
  upload_preset: "upload_preset",
  max_file_size: 4000000, // 4M
  max_image_width: 3000,
  client_allowed_formats: ["png", "jpg", "jpeg"]
};
const cloudinaryVideoOptions = {
  upload_preset: "upload_preset",
  folder: "cms/video",
  resource_type: "video",
  max_file_size: 50000000 // 50M
};

export default {
  name: `${COMP_PREFIX}-upload`,
  mixins: [baseMixin],
  data () {
    return {
      uploading: false,
      errorText: '',
    };
  },
  computed: {
    cStyle() {
      let style = {};
      if (this.component.value) {
        style.backgroundImage = `url(${this.component.value})`;
      }
      return style;
    },
    type () {
      return this.component.resourceType || 'image';
    }
  },
  methods: {
    upload(component) {
      if (this.uploading) return;
      const { resourceType = 'image', cloudinaryOptions = {} } = this.component;
      this.uploading = true;
      const options = Object.assign(
        {},
        commonCloudinaryOptions,
        resourceType === "image" ? cloudinaryImgOptions : cloudinaryVideoOptions,
        cloudinaryOptions
      );
      cloudinary.openUploadWidget(options, (err, result) => {
        this.uploading = false;
        if (err) {
          // this.$message.error(err.message);
          this.errorText = err.message;
        } else {
          // console.log('>>> openUploadWidget', result.event, result);
          this.errorText = '';
          const { event, info } = result;
          if (event === 'success') {
            let width = info.width > 1920 ? 1920 : info.width;
            width = `w_${width}`;
            const height = "";
            const blur = "";
            // don't use klook-res.cloudinary.com
            let url = info.url;
            const params = `/fl_lossy.progressive,q_85/c_fill,${blur},${width},${height}`;

            url = url.replace(/upload/, `upload${params}`);
            url = url.replace("http", "https");
            this.component.value = url;
            this.onChange();
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
  .upload-preview {
    position: relative;
    height: 190px;
    background-size: cover;
    border: 1px solid #eee;
    .upload-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      border-radius: 0;
      border: none;
      border-top: 1px solid #eee;
    }
    .image-hint {
      margin-top: 55px;
      text-align: center;
      font-size: 20px;
      color: #ddd;
    }
    video {
      height: 150px;
    }
  }
  .el-input {
    margin-top: 10px;
    width: 100%;
  }
  .error-text {
    color: #E64340;
  }
}
</style>
