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
