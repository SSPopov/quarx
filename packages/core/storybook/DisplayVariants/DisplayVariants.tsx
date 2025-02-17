import React, { FC } from 'react';
import { createID } from '@core';
import {
    Title,
    TitleOfContainer,
    Variant,
    Variants,
    Container,
    VerticalContainer,
} from './styledComponents';

type ValuesType = string | boolean | number

interface BaseVariantProps<VariantProps> {
    /** Компонент, который необходимо отобразить. Не рекомендуется оборачивать его другим компонентом. */
    component: FC<VariantProps>,

    /** Объект с дополнительными параметрами компонента. Применяется не в качестве отдельного примера. */
    componentProps?: VariantProps,

    /** Направление отрисовки.
     * @param vertical Вертикальное направление. Варианты будут расположены в колонну.
     * @param horizontal Горизонтальное направление. Варианты будут расположены в ряд. */
    direction?: 'vertical' | 'horizontal',
}

interface TitleProps {
    /** Размер заголовка
     * @param primary Основной заголовок
     * @param secondary Вторичный заголовок */
    size?: 'primary' | 'secondary',

    /** Показать/скрыть заголовок */
    isShown?: boolean,

    /** Тип заголовка
     * @param property Название свойства
     * @param value Значение свойства */
    type?: 'property' | 'value',
}

interface DisplayVariantsProps<VariantProps> extends BaseVariantProps<VariantProps> {
    /** Название отображаемого пропса */
    property: string,

    /** Массив значений для отображаемого пропса
     * @example
     * ['small', 'medium', 'large'] */
    values: Array<ValuesType>,

    /** Объект с настройками названия свойства */
    title?: TitleProps,
}

/** Функция предназначена для генерации различных вариантов компонента.
 * Принимает одно свойство и несколько значений. */
export function DisplayVariants<Props>(options: DisplayVariantsProps<Props>) {
    const {
        property,
        values,
        component,
        componentProps,
        title = {
            type: 'value',
            isShown: true,
            size: 'primary',
        },
        direction = 'horizontal',
    } = options;

    const examples = values.map((value) => (
        <Variant key={createID()} optionTitle={title.isShown}>
            {title.isShown && (
                <Title size={title.size}>
                    {title.type === 'value' ? value.toString() : property}
                </Title>
            )}
            {React.createElement(
                component,
                {
                    ...componentProps as unknown as Props,
                    [property]: value,
                },
            )}
        </Variant>
    ));

    return (
        <Variants direction={direction}>
            {examples}
        </Variants>
    );
}

DisplayVariants.defaultProps = {
    componentProps: {},
};

interface DisplayVariantsMapProps<VariantProps> extends BaseVariantProps<VariantProps> {
    /** Объект свойств, которые необходимо вывести в качестве примера
     * @example
     * {
     *     size: ['small', 'large'],
     *     color: ['warning', 'critical', 'color2', 'color1'],
     * } */
    variants: Record<string, Array<ValuesType>>,

    shownTitle?: boolean,

    /** Объект с настройками названия свойства */
    optionTitle?: TitleProps,
}

/** Функция предназначена для генерации различных вариантов компонента.
 * Принимает сразу несколько свойств.
 * Возможен выбор вертикального или горизонтального направления
 * @return
 * Будут выведены варианты компонента сгруппированные по свойствам, для каждого значения по одному варианту */
export function DisplayVariantsMap<Props>(options: DisplayVariantsMapProps<Props>) {
    const {
        variants,
        direction = 'horizontal',
        shownTitle = true,
        optionTitle = {
            size: 'secondary',
            isShown: true,
            type: 'value',
        },
        ...restOptions
    } = options;
    const keysOfProps = Object.keys(variants);

    return (
        <VerticalContainer direction={direction} spaceBetween={keysOfProps.length > 4}>
            {
                keysOfProps.map((property) => (
                    <Container direction={direction} center={variants[property].length < 3} key={createID()}>
                        {shownTitle && <TitleOfContainer direction={direction}>{property}</TitleOfContainer>}
                        {
                            DisplayVariants({
                                ...restOptions,
                                title: optionTitle,
                                direction,
                                property,
                                values: variants[property],
                            })
                        }
                    </Container>
                ))
            }
        </VerticalContainer>
    );
}

DisplayVariantsMap.defaultProps = {
    componentProps: {},
};
