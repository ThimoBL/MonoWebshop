import {Injectable, Logger} from '@nestjs/common';
import {Manufacturer, Product, Review, User} from "@mono-webshop/domain";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Manufacturer') private manufacturerModel: Model<Manufacturer>,
    @InjectModel('User') private userModel: Model<User>,
  ) {
  }

  async list(productId: string): Promise<Review[]> {
    return this.manufacturerModel.find<Review>({"products._id": productId}, {reviews: 1}).exec();
  }

  async create(review: Review): Promise<any> {
    const ObjectId = mongoose.Types.ObjectId;

    let reviewId = new ObjectId(review._id);

    try {
      //add review to user
      const addToUser = this.userModel.findOneAndUpdate<User>(
        {_id: review.createdBy._id},
        {
          $push: {
            reviews: reviewId
          }
        },
        {
          new: true,
          upsert: true,
          // session: transactionSession,
          runValidators: true
        });

      if (!addToUser) {
        throw Error('Review could not be added to user');
      }

      await addToUser.exec();

      const addReview = this.manufacturerModel.findOneAndUpdate(
        {"products._id": review.product},
        {
          $addToSet: {
            "products.$.reviews": {
              _id: reviewId,
              title: review.title,
              description: review.description,
              rating: review.rating,
              product: review.product,
              createdBy: review.createdBy
            }
          }
        },
        {
          new: true,
          upsert: true,
          // session: transactionSession,
          runValidators: true
        });

      if (!addReview) {
        throw Error('Review could not be added');
      } else {
        Logger.log('Review created');

        return addReview;
      }

    } catch (e) {
      Logger.error('Error while creating review', e);
    }
  }

  async update(id: string, review: Review): Promise<Review> {
    const existingReview = this.manufacturerModel.findOneAndUpdate<Review>(
      {"products._id": review.product},
      {
        $set:
          {"products.$[elem].reviews.$[elem2]": review}
      });

    if (!existingReview) {
      throw Error('Id does not exist');
    }
    return existingReview;
  }

  async delete(id: string): Promise<boolean> {
    const ObjectId = mongoose.Types.ObjectId;

    let reviewId = new ObjectId(id);

    const review = await this.manufacturerModel.findOne<Review>({"products.reviews._id": reviewId}, {"products.reviews": 1});

    if (!review) {
      throw Error('Id does not exist');
    }

    const user = await this.userModel.findOne<User>({reviews: id});

    if (!user) {
      throw Error('Id ' + id.toString() + ' does not exist');
    }

    const removeFromUser = await this.userModel.findOneAndUpdate<User>(
      {_id: user._id},
      {
        $pull: {
          reviews: reviewId
        }
      },
      {
        runValidators: true
      });

    if (!removeFromUser) {
      throw Error('Review could not be removed');
    }

    const removeFromProduct = await this.manufacturerModel.findOneAndUpdate<Review>(
      {"products.reviews._id": reviewId},
      {
        $pull: {
          "products.$.reviews": {_id: reviewId}
        }
      },
      {
        runValidators: true
      });

    if (!removeFromProduct) {
      throw Error('Review could not be removed');
    }

    return true;
  }

  async getReviewsByProduct(productId: string): Promise<Review[]> {
    return this.manufacturerModel.find<Review>({"products._id": productId}, {_id: 0, reviews: 1}).exec();
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return this.manufacturerModel.find<Review>({"products.reviews.createdBy": userId}, {reviews: 1}).exec();
  }
}
