'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

type CardType = {
  word: string
}

const words = [
  'Sincerity', 'Trust', 'Respect', 'Responsibility', 'Effort', 'Courage', 'Love', 'Compassion', 'Friendship', 'Gratitude',
  'Harmony', 'Patience', 'Kindness', 'Hope', 'Humility', 'Fairness', 'Justice', 'Creativity', 'Growth', 'Learning',
  'Freedom', 'Empathy', 'Happiness', 'Challenge', 'Aspiration', 'Wisdom', 'Integrity', 'Solidarity', 'Conviction', 'Passion',
  'Tolerance', 'Moderation', 'Contribution', 'Sustainability', 'Unity', 'Coordination', 'Honor', 'Duty', 'Honesty', 'Prosperity',
  'Abundance', 'Cooperation', 'Independence', 'Stability', 'Determination', 'Flexibility', 'Safety', 'Fortitude', 'Confidence', 'Inspiration',
  'Allocation', 'Ambition', 'Prudence', 'Coexistence', 'Mercy', 'Timing', 'Loyalty', 'Competence', 'Openness', 'Modesty',
  'Selflessness', 'Frugality', 'Understanding', 'Consideration', 'Benevolence', 'Excellence', 'Obedience', 'Execution', 'Discipline', 'Peace',
  'Initiative', 'Rationality', 'Insight', 'Intelligence', 'Agility', 'Resonance', 'Integration', 'Sensitivity', 'Truth', 'Faith',
  'Sharing', 'Enthusiasm', 'Devotion', 'Knowledge', 'Attention', 'Inclusiveness', 'Sensibility', 'Intuition', 'Expectation'
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
      alert("Not enough cards in the deck!")
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
      alert("You've reached the maximum number of discards!")
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
    const resultText = `Result:\nHand: ${result.hand.join(', ')}\nDiscarded: ${result.discarded.join(', ')}\nhttps://x.com/space_peacegg`

    const twitterBaseUrl = "https://twitter.com/intent/tweet"
    const shareText = encodeURIComponent(resultText)
    const twitterShareUrl = `${twitterBaseUrl}?text=${shareText}`

    window.open(twitterShareUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">space peace game</h1>
          <Button onClick={dealCards} disabled={gameOver} className="mb-4">
            Deal 7 Cards
          </Button>
          <div className="mb-2 text-sm font-medium">
            Discards remaining: {MAX_DISCARDS - discardCount}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Hand</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {hand.map((card, index) => renderCard(card, index, discardCard))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Discarded Cards</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {discarded.map((card, index) => renderCard(card, index))}
            </div>
          </div>
          {gameOver && (
            <>
              <div className="flex items-center justify-center text-yellow-500 mt-4">
                <AlertCircle className="mr-2" />
                <span>Game Over! Only 3 cards remain in your hand.</span>
              </div>
              <Button onClick={saveGameResult} className="mt-4">
                Share Result on Twitter
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

