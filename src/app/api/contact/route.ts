import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL

    if (!webhookUrl) {
      throw new Error('Slack Webhook URLが設定されていません')
    }

    const slackMessage = {
      text: `
お問い合わせがありました
名前: ${body.name}
メール: ${body.email}
メッセージ: ${body.message}
      `.trim()
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(slackMessage)
    })

    if (!response.ok) {
      throw new Error('Slackへの送信に失敗しました')
    }
    
    // 仮の成功レスポンス
    return NextResponse.json(
      { message: '正常に送信されました' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { message: '送信に失敗しました' },
      { status: 500 }
    )
  }
}
