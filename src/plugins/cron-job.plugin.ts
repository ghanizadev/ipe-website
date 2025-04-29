import { Config, Payload, Plugin } from 'payload';

const interval: { [key: string]: NodeJS.Timeout } = {};

export type CronJobEffectArgs = { payload: Payload };

export type CronJobEffect = {
  name: string;
  handler: (args: CronJobEffectArgs) => void | Promise<void>;
  frequency: number;
};

const cronJob = (): Plugin => {
  return async (incomingConfig: Config): Promise<Config> => {
    const effects: CronJobEffect[] | undefined =
      incomingConfig.collections?.reduce(
        (previous, current) =>
          current.custom?.cronJob
            ? [...previous, current.custom.cronJob as CronJobEffect]
            : previous,
        [] as CronJobEffect[]
      );

    const runEffects = async (payload: Payload) => {
      if (!effects) return;

      for (const { handler, frequency, name } of effects) {
        await handler({ payload });

        if (interval[name]) clearInterval(interval[name]);

        interval[name] = setInterval(
          runEffects.bind({}, payload),
          frequency * 1000
        );
      }
    };

    incomingConfig.onInit = async (payload) => {
      await runEffects(payload);
    };

    return incomingConfig;
  };
};

export default cronJob;
