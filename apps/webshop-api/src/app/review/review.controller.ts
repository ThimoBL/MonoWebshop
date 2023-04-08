import {Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Review} from "@mono-webshop/domain";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ReviewService} from "./review.service";

@Controller('reviews')
export class ReviewController {
  constructor(
    private reviewService: ReviewService
  ) {
  }

  @Get(':id')
  getManufacturers(@Param('id') productId: string) {
    Logger.log(`get reviews`);
    return this.reviewService.list(productId);
  }

  @Get('product/:id')
  getReviewsByProduct(@Param('id') id: string) {
    Logger.log(`get reviews by product ${id}`);
    return this.reviewService.getReviewsByProduct(id);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  getReviewsByUser(@Param('id') id: string) {
    Logger.log(`get reviews by user ${id}`);
    return this.reviewService.getReviewsByUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createReview(@Body() review: Review) {
    Logger.log(`create review ${JSON.stringify(review)}`);
    return this.reviewService.create(review);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateReview(@Param('id') id: string, @Body() review: Review) {
    Logger.log(`update review ${id}`);
    return this.reviewService.update(id, review);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    Logger.log(`delete review ${id}`);
    return this.reviewService.delete(id);
  }
}
