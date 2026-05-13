import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function AtLeastOne(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'atLeastOne',
      target: object.constructor,
      propertyName, // attaches error to a virtual field
      constraints: [properties],
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as Record<string, any>;
          const props = args.constraints[0] as string[];

          return props.some((prop) => {
            const value = obj[prop];

            // treat empty array as NOT provided
            if (Array.isArray(value)) return value.length > 0;

            return value !== undefined && value !== null;
          });
        },

        defaultMessage(args: ValidationArguments) {
          const props = args.constraints[0];
          return `At least one of [${props.join(', ')}] must be provided`;
        },
      },
    });
  };
}