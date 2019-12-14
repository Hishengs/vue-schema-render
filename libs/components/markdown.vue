<template>
  <div class="vsr_component_markdown">
    <textarea ref="editor" :placeholder="component.placeholder || 'input markdown here'"></textarea>
  </div>
</template>

<script>
import SimpleMDE from "simplemde";
import 'simplemde/dist/simplemde.min.css';
import cloudinary from "cloudinary";
import baseMixin from "./base.mixin";
import { COMP_PREFIX } from "../utils";

const defaultCloudinaryOptions = {
  cloud_name: "****",
  folder: "cms/markdown",
  multiple: false,
  upload_preset: "****",
  sources: ["local"],
  client_allowed_formats: ["png", "jpg", "jpeg", "svg"],
  resource_type: "image",
  max_file_size: 4000000, // 4M
  max_image_width: 3000,
  tags: []
};

export default {
  name: `${COMP_PREFIX}-markdown`,
  mixins: [baseMixin],
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    const uploadImage = [
      {
        name: "image",
        action: (/* editor, value */) => {
          window.cloudinary.openUploadWidget(
            Object.assign(
              {}, defaultCloudinaryOptions, this.component.cloudinaryOptions || {}
            ),
            this.onImageUpload
          );
        },
        className: "fa fa-picture-o",
        title: "Upload Image"
      }
    ];
    this.editor = new SimpleMDE({
      element: this.$refs.editor,
      spellChecker: false,
      toolbar: [
        "bold",
        "heading",
        "unordered-list",
        "link",
        "preview",
        ...uploadImage
      ],
      forceSync: true,
      // autoDownloadFontAwesome: false,
      status: false
    });
    this.editor.value(this.component.value || "");
    this.editor.codemirror.on("change", () => {
      const content = this.editor.value();
      this.component.value = content;
      this.onChange(this.component);
    });
  },
  methods: {
    onImageUpload (err, result) {
      if (err) {
        this.$message.error(err.message);
      } else {
        if (result && result.event === 'success') {
          const cm = this.editor.codemirror;
          const img = result.info;
          // const selectedText = cm.getSelection();
          const imageName = img.original_filename;
          const url = img.url.replace("http", "https");
          // markdown image: ![${imageName}](${url})
          const output = `![${imageName}](${url})`;
          cm.replaceSelection(output);
        }
      }
    }
  },
};
</script>

<style lang="scss">
.vsr_component_markdown {
  width: 450px;
  margin-top: 10px;
  margin-bottom: 10px;
}
/* .CodeMirror,
.CodeMirror-scroll {
  max-height: 500px;
} */
.editor-toolbar::before,
.editor-toolbar::after {
  margin: 0;
}
</style>
