import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Network } from '@/network'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Users, Clock, ShoppingCart, ChefHat, Flame, Check, LoaderCircle, ArrowRight } from 'lucide-react-taro'
import './index.css'

interface Dish {
  name: string
  description: string
  difficulty: string
  time: string
  calories?: string
  ingredients: string[]
  prepSteps: string[]
  cookSteps: string[]
}

interface RecipePlan {
  peopleCount: number
  mealTime: string
  dishes: Dish[]
  shoppingList: string[]
  prepTips: string[]
}

const IndexPage = () => {
  const [peopleCount, setPeopleCount] = useState<string>('2')
  const [mealTime, setMealTime] = useState<string>('dinner')
  const [loading, setLoading] = useState<boolean>(false)
  const [recipePlan, setRecipePlan] = useState<RecipePlan | null>(null)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

  const mealTimeOptions = [
    { value: 'breakfast', label: '早餐', icon: '☀️' },
    { value: 'lunch', label: '午餐', icon: '🌤️' },
    { value: 'dinner', label: '晚餐', icon: '🌙' },
  ]

  const handleGenerateRecipe = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/recipe/plan',
        method: 'POST',
        data: {
          peopleCount: parseInt(peopleCount),
          mealTime,
        },
      })

      if (res.data && res.data.data) {
        setRecipePlan(res.data.data)
      }
    } catch (error) {
      console.error('生成菜谱失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowDishDetail = (dish: Dish) => {
    setSelectedDish(dish)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case '简单':
      case 'simple':
        return 'bg-green-100 text-green-700'
      case '中等':
      case 'medium':
        return 'bg-amber-100 text-amber-700'
      case '困难':
      case 'hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <View className="min-h-screen bg-slate-50">
      {/* 顶部标题栏 */}
      <View className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-6">
        <View className="flex items-center gap-3">
          <ChefHat size={32} color="#ffffff" />
          <View className="flex flex-col">
            <Text className="block text-xl font-bold text-white">
              智能菜谱规划
            </Text>
            <Text className="block text-sm text-orange-100">
              AI 助你轻松烹饪
            </Text>
          </View>
        </View>
      </View>

      {/* 选择区域 */}
      <View className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm">
        {/* 人数选择 */}
        <View className="mb-4">
          <View className="flex items-center gap-2 mb-3">
            <Users size={20} color="#f97316" />
            <Text className="block text-base font-semibold text-slate-800">
              用餐人数
            </Text>
          </View>
          <Select
            value={peopleCount}
            onValueChange={(value) => setPeopleCount(value)}
          >
            <SelectTrigger className="bg-slate-50 rounded-xl border-slate-200">
              <SelectValue placeholder="选择人数" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1人用餐</SelectItem>
              <SelectItem value="2">2人用餐</SelectItem>
              <SelectItem value="3">3人用餐</SelectItem>
              <SelectItem value="4">4人用餐</SelectItem>
              <SelectItem value="5">5人及以上</SelectItem>
            </SelectContent>
          </Select>
        </View>

        {/* 时间段选择 */}
        <View>
          <View className="flex items-center gap-2 mb-3">
            <Clock size={20} color="#f97316" />
            <Text className="block text-base font-semibold text-slate-800">
              用餐时间
            </Text>
          </View>
          <View className="grid grid-cols-3 gap-3">
            {mealTimeOptions.map((option) => (
              <View
                key={option.value}
                className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all ${
                  mealTime === option.value
                    ? 'bg-orange-500 border-2 border-orange-500'
                    : 'bg-slate-50 border-2 border-slate-200'
                }`}
                onClick={() => setMealTime(option.value)}
              >
                <Text className="block text-2xl mb-1">{option.icon}</Text>
                <Text
                  className={`block text-sm font-medium ${
                    mealTime === option.value ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  {option.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 开始规划按钮 */}
        <Button
          className="w-full bg-orange-500 text-white mt-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          onClick={handleGenerateRecipe}
          disabled={loading}
        >
          {loading ? (
            <View className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" size={20} color="#ffffff" />
              <Text className="block text-white">正在智能规划中...</Text>
            </View>
          ) : (
            <View className="flex items-center justify-center gap-2">
              <Flame size={20} color="#ffffff" />
              <Text className="block text-white">开始规划菜谱</Text>
            </View>
          )}
        </Button>
      </View>

      {/* 菜谱展示区域 */}
      {recipePlan && (
        <View className="px-4 py-6">
          {/* 购物清单卡片 */}
          <Card className="bg-green-50 border-green-200 rounded-xl mb-4">
            <CardHeader className="pb-3">
              <View className="flex items-center justify-between">
                <View className="flex items-center gap-2">
                  <ShoppingCart size={20} color="#22c55e" />
                  <CardTitle className="text-lg font-semibold text-green-800">
                    购物清单
                  </CardTitle>
                </View>
                <Text className="block text-sm text-green-600">
                  共 {recipePlan.shoppingList.length} 种食材
                </Text>
              </View>
            </CardHeader>
            <CardContent>
              <View className="flex flex-wrap gap-2">
                {recipePlan.shoppingList.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-white text-green-700 border border-green-200 px-3 py-1"
                  >
                    {item}
                  </Badge>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* 菜品列表 */}
          <Text className="block text-lg font-bold text-slate-800 mb-4">
            推荐菜谱
          </Text>
          <View className="flex flex-col gap-4">
            {recipePlan.dishes.map((dish, index) => (
              <Card
                key={index}
                className="bg-white shadow-sm rounded-xl overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <View className="flex items-start justify-between">
                    <View className="flex-1">
                      <CardTitle className="text-lg font-semibold text-slate-800 mb-2">
                        {dish.name}
                      </CardTitle>
                      <Text className="block text-sm text-slate-600 mb-3">
                        {dish.description}
                      </Text>
                      <View className="flex flex-wrap gap-2">
                        <Badge className={getDifficultyColor(dish.difficulty)}>
                          {dish.difficulty}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700">
                          <Clock size={12} className="inline mr-1" />
                          {dish.time}
                        </Badge>
                        {dish.calories && (
                          <Badge className="bg-purple-100 text-purple-700">
                            <Flame size={12} className="inline mr-1" />
                            {dish.calories}
                          </Badge>
                        )}
                      </View>
                    </View>
                  </View>
                </CardHeader>
                <CardContent className="pt-3 border-t border-slate-100">
                  <Button
                    className="w-full bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"
                    onClick={() => handleShowDishDetail(dish)}
                  >
                    <View className="flex items-center justify-center gap-2">
                      <Text className="block text-sm">查看详细步骤</Text>
                      <ArrowRight size={16} color="#f97316" />
                    </View>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </View>

          {/* 备菜小贴士 */}
          {recipePlan.prepTips && recipePlan.prepTips.length > 0 && (
            <Card className="bg-amber-50 border-amber-200 rounded-xl mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-amber-800">
                  💡 备菜小贴士
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recipePlan.prepTips.map((tip, index) => (
                  <View key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                    <Check size={16} color="#f59e0b" className="mt-0.5" />
                    <Text className="block text-sm text-amber-700 flex-1">
                      {tip}
                    </Text>
                  </View>
                ))}
              </CardContent>
            </Card>
          )}
        </View>
      )}

      {/* 空状态 */}
      {!recipePlan && !loading && (
        <View className="flex flex-col items-center justify-center py-12 px-4">
          <View className="mb-4">
            <ChefHat size={64} color="#cbd5e1" />
          </View>
          <Text className="block text-lg font-semibold text-slate-400 mb-2 text-center">
            还没有菜谱
          </Text>
          <Text className="block text-sm text-slate-300 text-center">
            选择人数和时间段，让 AI 为你规划菜谱
          </Text>
        </View>
      )}

      {/* 菜品详情对话框 */}
      {selectedDish && (
        <Dialog open={!!selectedDish} onOpenChange={() => setSelectedDish(null)}>
          <DialogContent className="bg-white rounded-2xl p-6 max-w-lg mx-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800 mb-4">
                {selectedDish.name}
              </DialogTitle>
            </DialogHeader>

            {/* 所需食材 */}
            <View className="mb-6">
              <Text className="block text-base font-semibold text-slate-800 mb-3">
                🥗 所需食材
              </Text>
              <View className="flex flex-wrap gap-2">
                {selectedDish.ingredients.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1"
                  >
                    {item}
                  </Badge>
                ))}
              </View>
            </View>

            {/* 备菜步骤 */}
            <View className="mb-6">
              <Text className="block text-base font-semibold text-slate-800 mb-3">
                🔪 备菜步骤
              </Text>
              <View className="flex flex-col gap-3">
                {selectedDish.prepSteps.map((step, index) => (
                  <View key={index} className="flex items-start gap-3">
                    <View className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Text className="block text-xs font-bold text-white">
                        {index + 1}
                      </Text>
                    </View>
                    <Text className="block text-sm text-slate-600 flex-1">
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 做菜步骤 */}
            <View>
              <Text className="block text-base font-semibold text-slate-800 mb-3">
                🍳 做菜步骤
              </Text>
              <View className="flex flex-col gap-3">
                {selectedDish.cookSteps.map((step, index) => (
                  <View key={index} className="flex items-start gap-3">
                    <View className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Text className="block text-xs font-bold text-white">
                        {index + 1}
                      </Text>
                    </View>
                    <Text className="block text-sm text-slate-600 flex-1">
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </DialogContent>
        </Dialog>
      )}
    </View>
  )
}

export default IndexPage
