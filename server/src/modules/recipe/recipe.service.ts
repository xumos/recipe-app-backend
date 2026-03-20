import { Injectable } from '@nestjs/common'
import { Config } from 'coze-coding-dev-sdk'
import { LLMClient } from 'coze-coding-dev-sdk'
import { PlanRecipeDto } from './dto/plan-recipe.dto'

@Injectable()
export class RecipeService {
  private llmClient: LLMClient

  constructor() {
    const config = new Config()
    this.llmClient = new LLMClient(config)
  }

  async planRecipe(dto: PlanRecipeDto) {
    const { peopleCount, mealTime } = dto

    // 构建系统提示词
    const systemPrompt = `你是一位专业的厨师和营养师，擅长为不同人数和时间段规划营养均衡、美味可口的菜谱。
请根据用户的用餐人数和用餐时间段，智能规划菜谱。

输出格式必须是有效的 JSON，包含以下字段：
{
  "dishes": [
    {
      "name": "菜品名称",
      "description": "菜品简短描述（20字以内）",
      "difficulty": "简单/中等/困难",
      "time": "烹饪时间（如：30分钟）",
      "calories": "热量（如：350卡/人）",
      "ingredients": ["食材1", "食材2", "食材3"],
      "prepSteps": ["备菜步骤1", "备菜步骤2"],
      "cookSteps": ["做菜步骤1", "做菜步骤2", "做菜步骤3"]
    }
  ],
  "shoppingList": ["食材1", "食材2", "食材3"],
  "prepTips": ["备菜小贴士1", "备菜小贴士2"]
}

要求：
1. 根据 ${peopleCount} 人份量调整食材用量
2. 菜品数量：早餐1-2道，午餐2-3道，晚餐3-4道
3. 确保营养均衡，荤素搭配
4. 优先推荐家常菜，难度适中
5. 所有食材汇总到 shoppingList
6. 备菜小贴士要实用具体
7. 只返回 JSON 格式，不要其他内容`

    const userPrompt = `请为 ${peopleCount} 人规划${mealTime === 'breakfast' ? '早餐' : mealTime === 'lunch' ? '午餐' : '晚餐'}菜谱。`

    try {
      const messages = [
        { role: 'system' as const, content: systemPrompt },
        { role: 'user' as const, content: userPrompt },
      ]

      // 使用 thinking 模式提高规划质量
      const response = await this.llmClient.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.7,
        thinking: 'enabled',
      })

      // 解析 LLM 返回的 JSON
      const jsonContent = this.extractJson(response.content)

      if (!jsonContent) {
        throw new Error('LLM 返回的格式不正确')
      }

      // 返回结构化数据
      return {
        peopleCount,
        mealTime,
        ...jsonContent,
      }
    } catch (error) {
      console.error('菜谱规划失败:', error)
      throw new Error('菜谱规划失败，请稍后重试')
    }
  }

  /**
   * 从文本中提取 JSON
   */
  private extractJson(content: string): any {
    try {
      // 尝试直接解析
      return JSON.parse(content)
    } catch {
      // 如果直接解析失败，尝试提取 JSON 部分
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0])
        } catch {
          return null
        }
      }
      return null
    }
  }
}
