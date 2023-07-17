import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Routes {
  Home = 'Home',
  Game = 'Game',
}

export type HomeParams = {[Routes.Home]: undefined};
export type GameParams = {[Routes.Game]: {firstAI: boolean}};

export type HomeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<HomeParams, Routes.Home>,
  CompositeNavigationProp<
    NativeStackNavigationProp<HomeParams, Routes.Home>,
    NativeStackNavigationProp<GameParams, Routes.Game>
  >
>;

export type GameRouteProps<RouteName extends keyof GameParams> = RouteProp<
  GameParams,
  RouteName
>;
