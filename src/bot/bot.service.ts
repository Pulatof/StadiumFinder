import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from 'src/app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { Bot } from './models/bot.model';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({
      where: { user_id: ctx.from.id },
    });
    if (!user) {
      await this.botRepo.create({
        user_id: userId,
        firstname: ctx.from.first_name,
        lastname: ctx.from.last_name,
        username: ctx.from.username,
      });



      await ctx.reply(
        `Iltimos, <b>"Telefon raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else if (!user.dataValues.status) {
      await ctx.reply(
        `Iltimos, <b>"Telefon raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else {
        await this.bot.telegram.sendChatAction(userId, 'typing')
      await ctx.reply("Bu bot orqali Stadion dasturi bn muloqot o'rnatiladi", {
        parse_mode: 'HTML',
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onContact(ctx: Context) {
    if ('contact' in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botRepo.findOne({ where: { user_id: userId } });
      if (!user) {
        ctx.reply(`Iltimos, <b>Start</b> tugmasini bosing!`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        });
      } else if (ctx.message['contact'].user_id != userId) {
        await ctx.reply(`Iltimos, ozingizni raqamingizni kiriting`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamini yuborish')],
          ])
            .oneTime()
            .resize(),
        });
      } else {
        const  phone= ctx.message.contact.phone_number
        
        await this.botRepo.update(
          {
            phone: phone,
            status: true,
          },
          {
            where: { user_id: userId },
          },
        );
      }
      await ctx.reply(`Tabriklayman, siz royxatdan otdingiz!`, {
        parse_mode: 'HTML',
        ...Markup.removeKeyboard(),
      });
    }
  }
  async onStop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({ where: { user_id: userId } });
    if (user.dataValues.status) {
      await this.botRepo.update(
        {
          status: false,
          phone: null,
        },
        { where: { user_id: userId } },
      );
    }await ctx.reply(`Siz botdan chiqib kettingiz!`, {
        parse_mode:'HTML',
        ...Markup.keyboard([['/start']]).oneTime().resize()
    })
  }

  async sendOTP(phoneNumber:string, OTP:string):Promise<boolean>{
    const user = await this.botRepo.findOne({ where: { phone:phoneNumber } })
    if (!user || !user.dataValues.status){
        return false
    }
    await this.bot.telegram.sendChatAction(user.user_id,'typing')
    await this.bot.telegram.sendMessage(user.user_id, "VERIFY CODE: " + OTP)
    return true
  }

}
