import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User';
import { schema } from '@ioc:Adonis/Core/Validator'
import BadRequest from 'App/Exceptions/BadRequestException'
import CreateUser from 'App/Validators/CreateUserValidator'
import UpdateUser from 'App/Validators/UpdateUserValidator'
export default class AuthController {
  async login({ auth, request, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    })
    const payloadData = await request.validate({
      schema: newUserSchema,
    });

    const user = await User.findByOrFail('email', payloadData.email)

    if (!(await Hash.verify(user.password, payloadData.password))) {
      return response.badRequest('Invalid credentials')
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '30mins'
    })

    return response.json({
      status: 200,
      token
    })
  }

  async fetchProfile({ auth, response }: HttpContextContract) {
    const authUser = await auth.use('api');
    if (authUser.isLoggedIn) {
      return response.json({
        token: authUser.user
      })
    } else {
      return response.badRequest('Invalid credentials')
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const userPayload = await request.validate(CreateUser)

    const userByEmail = await User.findBy('email', userPayload.email)
    const userByUsername = await User.findBy('username', userPayload.username)

    if (userByEmail) throw new BadRequest('email already in use', 409)
    if (userByUsername) throw new BadRequest('username already in use', 409)

    const user = await User.create(userPayload)
    return response.created({ user })
  }
  async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { email, password, avatar } = await request.validate(UpdateUser)
    const id = request.param('id')
    const user = await User.findOrFail(id)

    user.email = email
    user.password = password
    if (avatar) user.avatar = avatar
    await user.save()

    return response.ok({ user })
  }
}

