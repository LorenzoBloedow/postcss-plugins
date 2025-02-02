import { GeneralEnclosed } from '../nodes/general-enclosed';
import { MediaAnd } from '../nodes/media-and';
import { MediaCondition } from '../nodes/media-condition';
import { MediaConditionList, MediaConditionListWithAnd, MediaConditionListWithOr } from '../nodes/media-condition-list';
import { MediaFeature } from '../nodes/media-feature';
import { MediaFeatureBoolean } from '../nodes/media-feature-boolean';
import { MediaFeatureName } from '../nodes/media-feature-name';
import { MediaFeaturePlain } from '../nodes/media-feature-plain';
import { MediaFeatureRange, MediaFeatureRangeNameValue, MediaFeatureRangeValueName, MediaFeatureRangeValueNameValue } from '../nodes/media-feature-range';
import { MediaFeatureValue } from '../nodes/media-feature-value';
import { MediaInParens } from '../nodes/media-in-parens';
import { MediaNot } from '../nodes/media-not';
import { MediaOr } from '../nodes/media-or';
import { MediaQuery, MediaQueryInvalid, MediaQueryWithoutType, MediaQueryWithType } from '../nodes/media-query';
export declare function isCustomMedia(x: unknown): x is GeneralEnclosed;
export declare function isGeneralEnclosed(x: unknown): x is GeneralEnclosed;
export declare function isMediaAnd(x: unknown): x is MediaAnd;
export declare function isMediaConditionList(x: unknown): x is MediaConditionList;
export declare function isMediaConditionListWithAnd(x: unknown): x is MediaConditionListWithAnd;
export declare function isMediaConditionListWithOr(x: unknown): x is MediaConditionListWithOr;
export declare function isMediaCondition(x: unknown): x is MediaCondition;
export declare function isMediaFeatureBoolean(x: unknown): x is MediaFeatureBoolean;
export declare function isMediaFeatureName(x: unknown): x is MediaFeatureName;
export declare function isMediaFeatureValue(x: unknown): x is MediaFeatureValue;
export declare function isMediaFeaturePlain(x: unknown): x is MediaFeaturePlain;
export declare function isMediaFeatureRange(x: unknown): x is MediaFeatureRange;
export declare function isMediaFeatureRangeNameValue(x: unknown): x is MediaFeatureRangeNameValue;
export declare function isMediaFeatureRangeValueName(x: unknown): x is MediaFeatureRangeValueName;
export declare function isMediaFeatureRangeValueNameValue(x: unknown): x is MediaFeatureRangeValueNameValue;
export declare function isMediaFeature(x: unknown): x is MediaFeature;
export declare function isMediaInParens(x: unknown): x is MediaInParens;
export declare function isMediaNot(x: unknown): x is MediaNot;
export declare function isMediaOr(x: unknown): x is MediaOr;
export declare function isMediaQuery(x: unknown): x is MediaQuery;
export declare function isMediaQueryWithType(x: unknown): x is MediaQueryWithType;
export declare function isMediaQueryWithoutType(x: unknown): x is MediaQueryWithoutType;
export declare function isMediaQueryInvalid(x: unknown): x is MediaQueryInvalid;
