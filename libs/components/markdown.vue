<template>
  <div class="vsr_component_markdown">
    <textarea ref="editor"></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import baseMixin from "./base.mixin.js";
import { COMP_PREFIX } from "../utils";

const defaultCloudinaryOptions = {
  folder: "cms/markdown",
  cloud_name: "cloud_name",
  multiple: false,
  upload_preset: "upload_preset",
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
      editor: null,
    };
  },
  watch: {
    isDisabled (disabled) {
      this.editor.codemirror.setOption('readOnly', disabled);
    }
  },
  mounted() {
    const { cloudinaryOptions = {} } = this.component;
    const uploadImage = [
      {
        name: "image",
        action: async function uploadImage(editor, value) {
          cloudinary.openUploadWidget(Object.assign({}, defaultCloudinaryOptions, cloudinaryOptions), (err, result) => {
            if (err) {
              this.$message && this.$message.error(err.message);
            } else {
              const { event, info } = result;
              if (event === 'success') {
                const imageName = info.original_filename;
                const url = info.url.replace("http", "https");
                editor.codemirror.replaceSelection(`![${imageName}](${url})`);
              }
            }
          });
        },
        className: "fa fa-picture-o",
        title: "Upload Image"
      }
    ];
    this.editor = new SimpleMDE({
      element: this.$refs.editor,
      placeholder: 'input markdown here',
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
      autoDownloadFontAwesome: true,
      status: false
    });
    this.editor.value(this.component.value || "");
    let changed = false;
    this.editor.codemirror.on("change", () => {
      this.component.value = this.editor.value();
      changed = true;
    });
    this.editor.codemirror.on("blur", () => {
      if (changed) {
        this.onChange();
        changed = false;
      }
    });
    this.editor.codemirror.setOption('readOnly', this.isDisabled);
  }
};
</script>

<style lang="scss">
@import "~simplemde/dist/simplemde.min.css";

.vsr_component_markdown {
  /* height: 220px; */
  min-width: 300px;
  max-width: 500px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.CodeMirror,
.CodeMirror-scroll {
  max-height: 500px;
}
.editor-toolbar::before,
.editor-toolbar::after {
  margin: 0;
}
</style>
