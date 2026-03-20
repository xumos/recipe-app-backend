import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { RecipeService } from './recipe.service'
import { PlanRecipeDto } from './dto/plan-recipe.dto'

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('plan')
  @HttpCode(HttpStatus.OK)
  async planRecipe(@Body() body: PlanRecipeDto) {
    const result = await this.recipeService.planRecipe(body)
    return {
      code: 200,
      message: '菜谱规划成功',
      data: result,
    }
  }
}
