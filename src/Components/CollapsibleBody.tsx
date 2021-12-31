import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
// @ts-ignore
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Card } from 'react-native-paper'

import { GlobalStyles, Colors, ImagePath } from '../Config'

interface Props {
    header: string
    title: string
    collapsibleValue: boolean
    setCollapsibleValue: (value: boolean) => void
}

const CollapsibleBody: React.FC<Props> = ({ header, title, collapsibleValue, setCollapsibleValue }) => {
    return (
        <Collapse onToggle={(value: boolean) => setCollapsibleValue(value)}>
            <CollapseHeader>
                <Card style={styles.collapsibleHeader}>
                    <View style={[GlobalStyles.rowBetween, { marginHorizontal: wp('3%') }]}>
                        <Text style={[styles.sectionHeader, { fontStyle: collapsibleValue ? "italic" : "normal", }]}>{header}</Text>
                        <View style={{ backgroundColor: Colors.gray, padding: hp('0.5%'), borderRadius: hp('3%') }}>
                            <Image source={collapsibleValue ? ImagePath.upArrow : ImagePath.downArrow} style={[GlobalStyles.arrowImage, { alignSelf: 'flex-end' }]} />
                        </View>
                    </View>
                </Card>
            </CollapseHeader>
            <CollapseBody>
                <Card style={styles.collapsibleHeader}>
                    <View style={[GlobalStyles.horizontalLine, { width: '90%' }]} />
                    <Text style={[GlobalStyles.regularText, { fontStyle: 'italic', marginHorizontal: wp('4%') }]}>
                        {title}
                    </Text>
                </Card>
            </CollapseBody>
        </Collapse >
    )
}

const styles = StyleSheet.create({
    collapsibleHeader: {
        paddingVertical: hp('1%'),
        alignSelf: 'center',
        width: wp('85%'),
    }, innerContainer: {
        marginHorizontal: wp('4%'),
    }, sectionHeader: {
        ...GlobalStyles.regularText,
        fontWeight: '600',
    },
})

export default CollapsibleBody