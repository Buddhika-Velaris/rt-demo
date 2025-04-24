import { useCallback, useState, useEffect } from 'react'

import RichTextEditor, { BaseKit } from 'velaris-richtext-editor'

import { locale } from 'velaris-richtext-editor/locale-bundle'
import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  BubbleMenuExcalidraw,
  BubbleMenuMermaid,
  BubbleMenuDrawer
} from 'velaris-richtext-editor/bubble-extra';

import { Attachment } from 'velaris-richtext-editor/attachment';
import { Blockquote } from 'velaris-richtext-editor/blockquote';
import { Bold } from 'velaris-richtext-editor/bold';
import { BulletList } from 'velaris-richtext-editor/bulletlist';
import { Clear } from 'velaris-richtext-editor/clear';
import { Code } from 'velaris-richtext-editor/code';
import { CodeBlock } from 'velaris-richtext-editor/codeblock';
import { Color } from 'velaris-richtext-editor/color';
import { ColumnActionButton } from 'velaris-richtext-editor/multicolumn';
import { Emoji } from 'velaris-richtext-editor/emoji';
import { ExportPdf } from 'velaris-richtext-editor/exportpdf';
import { ExportWord } from 'velaris-richtext-editor/exportword';
import { FontFamily } from 'velaris-richtext-editor/fontfamily';
import { FontSize } from 'velaris-richtext-editor/fontsize';
import { FormatPainter } from 'velaris-richtext-editor/formatpainter';
import { Heading } from 'velaris-richtext-editor/heading';
import { Highlight } from 'velaris-richtext-editor/highlight';
import { History } from 'velaris-richtext-editor/history';
import { HorizontalRule } from 'velaris-richtext-editor/horizontalrule';
import { Iframe } from 'velaris-richtext-editor/iframe';
import { Image } from 'velaris-richtext-editor/image';
import { ImageGif } from 'velaris-richtext-editor/imagegif';
import { ImportWord } from 'velaris-richtext-editor/importword';
import { Indent } from 'velaris-richtext-editor/indent';
import { Italic } from 'velaris-richtext-editor/italic';
import { LineHeight } from 'velaris-richtext-editor/lineheight';
import { Link } from 'velaris-richtext-editor/link';
import { Mention } from 'velaris-richtext-editor/mention';
import { MoreMark } from 'velaris-richtext-editor/moremark';
import { OrderedList } from 'velaris-richtext-editor/orderedlist';
import { SearchAndReplace } from 'velaris-richtext-editor/searchandreplace';
import { SlashCommand } from 'velaris-richtext-editor/slashcommand';
import { Strike } from 'velaris-richtext-editor/strike';
import { Table } from 'velaris-richtext-editor/table';
import { TableOfContents } from 'velaris-richtext-editor/tableofcontent';
import { TaskList } from 'velaris-richtext-editor/tasklist';
import { TextAlign } from 'velaris-richtext-editor/textalign';
import { TextUnderline } from 'velaris-richtext-editor/textunderline';
import { Video } from 'velaris-richtext-editor/video';
import { TextDirection } from 'velaris-richtext-editor/textdirection';
import { Katex } from 'velaris-richtext-editor/katex';
import { Drawer } from 'velaris-richtext-editor/drawer';
import { Excalidraw } from 'velaris-richtext-editor/excalidraw';
import { Twitter } from 'velaris-richtext-editor/twitter';
import { Mermaid } from 'velaris-richtext-editor/mermaid';

import 'velaris-richtext-editor/lib/velaris-richtext-editor.css'
import 'prism-code-editor-lightweight/layout.css';
import "prism-code-editor-lightweight/themes/github-dark.css"

import 'katex/dist/katex.min.css'
import 'easydrawer/styles.css'

function convertBase64ToBlob(base64) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  TextUnderline,
  Strike,
  MoreMark,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (files) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  Video.configure({
    upload: (files) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  ImageGif.configure({
    GIPHY_API_KEY: 'q6Xm1Izr81zqKzNBtfacJ2uGT4SYOiuQ',
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock,
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
    upload: (files) => {
      const f = files.map(file => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))
      return Promise.resolve(f)
    },
  }),
  ExportWord,
  TextDirection,
  Mention,
  Attachment.configure({
    upload: (file) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),

  Katex,

  Mermaid.configure({
    upload: (file) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
  Drawer.configure({
    upload: (file) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
  Twitter,
]

const DEFAULT = `</div><h1 dir="auto" style="text-align: center">Rich Text Editor</h1><p dir="auto"></p><p dir="auto" style="text-align: center"></p><p dir="auto"><div style="text-align: center;" class="image"><img height="auto" style="" src="https://cdn.glitch.global/51637606-60d9-484c-a941-c3ad0567928a/ddsd.jpg?v=1745474263236" flipx="false" flipy="false" width="500" align="center" inline="false"></div></p>
<p dir="auto"><div style="text-align: center;" class="image"><img height="auto" style="" src="https://picsum.photos/1920/1080.webp?t=1" flipx="false" flipy="false" width="500" align="center" inline="false"></div></p>
<p dir="auto"><h2 dir="auto">Features</h2><ul><li><p dir="auto">Markdown support</p></li><li><p dir="auto">Support iframe</p></li><li><p dir="auto">Support mermaid</p></li></ul>`

function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function App() {
  const [content, setContent] = useState(DEFAULT)
  const [theme, setTheme] = useState('light')
  const [disable, setDisable] = useState(false)

  // Set data-theme attribute based on the theme state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onValueChange = useCallback(
    debounce((value) => {
      setContent(value)
    }, 300),
    [],
  )

  return (
    <div className="app-container" >
      <div className="editor-container">
        <div className="editor-wrapper">
          <p style={{
            paddingBottom: '50px',
          }}></p>
          <RichTextEditor
            output="html"
            content={content}
            onChangeContent={onValueChange}
            extensions={extensions}
            dark={theme === 'dark'}
            disabled={disable}
            bubbleMenu={{
              render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
                return <>
                  {bubbleDefaultDom}

                  {extensionsNames.includes('twitter') ? <BubbleMenuTwitter disabled={disabled}
                    editor={editor}
                    key="twitter"
                  /> : null}
                  {extensionsNames.includes('katex')  ? <BubbleMenuKatex disabled={disabled}
                    editor={editor}
                    key="katex"
                  /> : null}
                  {extensionsNames.includes('excalidraw')  ? <BubbleMenuExcalidraw disabled={disabled}
                    editor={editor}
                    key="excalidraw"
                  /> : null}
                  {extensionsNames.includes('mermaid')  ? <BubbleMenuMermaid disabled={disabled}
                    editor={editor}
                    key="mermaid"
                  /> : null}
                  {extensionsNames.includes('drawer')  ? <BubbleMenuDrawer disabled={disabled}
                    editor={editor}
                    key="drawer"
                  /> : null}
                </>
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App