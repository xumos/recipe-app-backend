import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { RecipeModule } from '@/modules/recipe/recipe.module';

@Module({
  imports: [RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
