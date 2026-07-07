/*
 *
 * GiveawayRules actions
 *
 */
import { action } from 'typesafe-actions';
import { User } from '../UserList/types';
import ActionTypes from './constants';

export const changeKeyword = (keyword: string) =>
  action(ActionTypes.CHANGE_KEYWORD, keyword);

export const changePreWinner = (preWinner: User | null) =>
  action(ActionTypes.CHANGE_PREWINNER, preWinner);

export const changePrize = (prize: string) =>
  action(ActionTypes.CHANGE_PRIZE, prize);

export const changeRequirement = (requirement: number) =>
  action(ActionTypes.CHANGE_PARTICIPANT_REQUIREMENT, requirement);
