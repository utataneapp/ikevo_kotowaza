import moment from "moment"
import { kotowazaList } from "../../pages/api/dropdownList"

export const translateErrors = (code: string) => {
  const error = {
    title: "エラーが発生しました",
    description: "時間を空けてお試しください",
  }
  switch (code) {
    case "auth/email-already-in-use":
      error.description = "メールアドレスが使用されております"
      break
    case "auth/invalid-email":
      error.description = "メールアドレスが不正です"
      break
    case "auth/operation-not-allowed":
      error.description = "開発者にお問い合わせください"
      break
    case "auth/weak-password":
      error.description = "パスワードを6文字以上に設定してください"
      break
    case "auth/user-disabled":
      error.description = "アカウントが無効です"
      break
    case "auth/user-not-found":
      error.description = "ユーザが見つかりませんでした"
      break
    case "auth/wrong-password":
      error.description = "パスワードが間違っています"
      break

    default:
      break
  }
  return error
}

export const displayId = (userID: string) => {
  //12文字抽出
  let result = userID.substring(0, 12)
  result = "@" + result
  return result
}

export const kotowaza = (key: number) =>
  kotowazaList.find((obj) => obj.key === key)?.value

export const nowDate = () =>
  moment().format("YYYY年MM月DD日 HH時mm分").toString()

export const checkOkByDevice = (updatedByIos: boolean, deviceIos: boolean) => {
  if (!updatedByIos) {
    if (deviceIos) {
      return false
    }
    return true
  }
  return true
}
