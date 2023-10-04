import React, {
  useEffect,
  forwardRef,
  useRef,
  useCallback,
  useState,
} from "react";
import { useWindowDimensions } from "react-native";
import { View, useSx, Text, Pressable, ScrollView } from "dripsy";
import WebHeader from "../components/WebHeader";
import Container from "../components/Container";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { MENUS, HEADER_HEIGHT } from "../components/WebHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute, useLinkBuilder, useLinkTo } from "@react-navigation/native";
import { useUpdateEffect } from "ahooks";

import { useLayout } from "../hooks/useLayout";

const MenuItem = ({ name, isActive, onPress }) => {
  return (
    <Pressable style={{ flexDirection: "row" }} onPress={onPress}>
      {isActive && <View sx={{ height: "100%", width: 4, bg: "$primary" }} />}
      <View sx={{ py: "$3", px: "$3" }}>
        <Text
          sx={{
            color: "$black",
            fontSize: 16,
            ...(isActive && {
              fontWeight: "700",
              color: "$primary",
            }),
          }}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

const DefaultLayout = forwardRef(
  (
    {
      children,
      onContainerLayout = () => {},
      borderRadius,
      bg,
      mt,
      useFullScreen,
    },
    ref
  ) => {
    const { width } = useWindowDimensions();
    const linkTo = useLinkTo();
    const route = useRoute();
    const buildLink = useLinkBuilder();
    const linking = buildLink(route.name, route.params);
    const activePath = useRef(null);

    const [showFullMenu, setShowFullMenu] = useState(undefined);

    const { onLayout: onContentLayout, width: contentWidth } = useLayout();

    useUpdateEffect(() => {
      setShowFullMenu(
        contentWidth === 0 || contentWidth > 120 * Object.keys(MENUS)?.length
      );
    }, [contentWidth]);

    const sx = useSx();
    const drawerRef = useRef(null);

    const openMenu = useCallback(() => {
      drawerRef.current && drawerRef.current.openDrawer();
    }, []);

    const closeMenu = useCallback(() => {
      drawerRef.current && drawerRef.current.closeDrawer();
    }, []);

    const { drawerWidth } = sx({
      drawerWidth: [(width * 3) / 4, width / 3],
    });

    const onItemPress = (path) => {
      activePath.current = path;
      closeMenu();
    };

    const renderDrawer = useCallback(() => {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View sx={{ height: HEADER_HEIGHT }}>
            <Pressable
              style={{
                height: HEADER_HEIGHT,
                width: HEADER_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
              }}
              onPress={closeMenu}
            >
              <MaterialIcons name="close" size={36} color="#0072B1" />
            </Pressable>
          </View>

          {Object.values(MENUS).map(({ name, path }, index) => {
            const isActive = linking.startsWith(path);
            return (
              <MenuItem
                isActive={isActive}
                key={index}
                name={name}
                onPress={() => onItemPress(path)}
              />
            );
          })}
        </View>
      );
    }, []);

    const onDrawerStateChanged = useCallback((newState, drawerWillShow) => {
      if (!drawerWillShow && activePath.current) {
        setTimeout(() => {
          linkTo(activePath.current);
        }, 100);
      }
    }, []);

    if (showFullMenu) {
      return (
        <View style={{ flex: 1 }}>
          <WebHeader
            openMenu={openMenu}
            onContentLayout={onContentLayout}
            showFullMenu={showFullMenu}
          />
          <ScrollView
            ref={ref}
            sx={{
              flexGrow: 1,
              bg: "$background",
            }}
          >
            <Container
              bg={bg}
              mt={mt}
              useFullScreen={useFullScreen}
              borderRadius={borderRadius}
              onLayout={onContainerLayout}
            >
              {children}
            </Container>
          </ScrollView>
        </View>
      );
    }

    return (
      <View sx={{ flex: 1 }}>
        <DrawerLayout
          ref={drawerRef}
          drawerWidth={drawerWidth}
          drawerPosition={DrawerLayout.positions.Right}
          drawerType="front"
          drawerBackgroundColor="rgba(0,0,0,0.6)"
          renderNavigationView={renderDrawer}
          overlayColor={"rgba(0, 0, 0, 0.3)"}
          onDrawerStateChanged={onDrawerStateChanged}
          drawerLockMode={"locked-open"}
        >
          <View style={{ flex: 1 }}>
            <WebHeader
              openMenu={openMenu}
              onContentLayout={onContentLayout}
              showFullMenu={showFullMenu}
            />
            <ScrollView
              sx={{
                flexGrow: 1,
                bg: "$background",
              }}
            >
              <Container
                bg={bg}
                mt={mt}
                borderRadius={borderRadius}
                onLayout={onContainerLayout}
              >
                {children}
              </Container>
            </ScrollView>
          </View>
        </DrawerLayout>
      </View>
    );
  }
);

export default DefaultLayout;
