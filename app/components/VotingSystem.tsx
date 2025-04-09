'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

type CardType = {
  word: string
}

const words = [
  '好奇心', '発見', '学び', '挑戦', '知識',
  '統制', '視点', '賢さ', '法律', '変革',
  '創造', '新しさ', '情熱', '夢', '冒険',
  '未来', '豊かさ', '期待', '文化', '幸運',
  '挑戦', 'エネルギー', '仕事', '金', '機会',
  'リーダーシップ', '努力', '安全', '統制', '国家',
  '未来', '悟り', '奇跡', '自由', '希望',
  '絆', '再生', '記憶', '知識', '視点',
  '分かち合い', '愛', 'コミュニティ', '絆', '未来',
  'バランス', '信頼', '安全', '安住', '夢'
]

const MAX_DISCARDS = 4

export default function ValuesCardGame() {
  const [deck, setDeck] = useState<CardType[]>([])
  const [hand, setHand] = useState<CardType[]>([])
  const [discarded, setDiscarded] = useState<CardType[]>([])
  const [discardCount, setDiscardCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    initializeDeck()
  }, [])

  const initializeDeck = () => {
    const newDeck = words.map(word => ({ word }))
    setDeck(shuffleDeck(newDeck))
  }

  const shuffleDeck = (deck: CardType[]) => {
    return [...deck].sort(() => Math.random() - 0.5)
  }

  const dealCards = () => {
    if (deck.length < 7) {
      alert("デッキにカードが足りません！")
      return
    }
    const dealtCards = deck.slice(0, 7)
    setHand(dealtCards)
    setDeck(deck.slice(7))
    setDiscarded([])
    setDiscardCount(0)
    setGameOver(false)
  }

  const discardCard = (index: number) => {
    if (discardCount >= MAX_DISCARDS) {
      alert("捨てられる回数の上限に達しました！")
      return
    }
    const [discardedCard] = hand.splice(index, 1)
    const newHand = [...hand]
    const newDiscarded = [...discarded, discardedCard]
    setHand(newHand)
    setDiscarded(newDiscarded)
    setDiscardCount(discardCount + 1)
    if (newHand.length === 3) {
      setGameOver(true)
    }
  }

  const renderCard = (card: CardType, index: number, onClick?: (index: number) => void) => (
    <Card 
      key={index} 
      className={`h-36 flex flex-col items-center justify-center cursor-pointer text-black`}
      onClick={onClick && discardCount < MAX_DISCARDS ? () => onClick(index) : undefined}
    >
      <CardContent className="text-center">
        <div className="text-sm font-bold">{card.word}</div>
      </CardContent>
    </Card>
  )

  const saveGameResult = () => {
    const result = {
      hand: hand.map(card => card.word),
      discarded: discarded.map(card => card.word)
    }
    const resultText = `@space_peacegg スペースピースゲームの結果：\n残したカード: ${result.hand.join(', ')}\n捨てたカード: ${result.discarded.join(', ')}`

    const twitterBaseUrl = "https://twitter.com/intent/tweet"
    const shareText = encodeURIComponent(resultText)
    const twitterShareUrl = `${twitterBaseUrl}?text=${shareText}`

    window.open(twitterShareUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">スペースピースゲーム</h1>
          <Button onClick={dealCards} disabled={gameOver} className="mb-4">
            カードを7枚引く
          </Button>
          <div className="mb-2 text-sm font-medium">
            残りの捨てられる回数: {MAX_DISCARDS - discardCount}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">手札</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {hand.map((card, index) => renderCard(card, index, discardCard))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">捨てたカード</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {discarded.map((card, index) => renderCard(card, index))}
            </div>
          </div>
          {gameOver && (
            <>
              <div className="flex items-center justify-center text-yellow-500 mt-4">
                <AlertCircle className="mr-2" />
                <span>ゲーム終了！手札が3枚になりました。</span>
              </div>
              <Button onClick={saveGameResult} className="mt-4">
                結果をXでシェアする
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
