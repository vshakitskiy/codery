import { tuple } from "./utils"

export const editorDefaultValue = "const sayHello = (name: string = \"stranger\") => {\r\n    console.log(`Hello, ${name}`)\r\n}\r\n\r\nsayHello(\"Mike\")"

export const languages = tuple("typescript", "javascript")