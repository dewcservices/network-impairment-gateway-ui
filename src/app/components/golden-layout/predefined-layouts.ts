import { ComponentItemConfig, ItemType, LayoutConfig } from 'golden-layout'
import { EnvironmentType } from '../../dtos/environment-dtos'

export interface Layout {
  name: string
  config: LayoutConfig
}

const impairmentGatewayConfig: LayoutConfig = {
  root: {
    type: ItemType.row,
    content: [
      {
        width: 90,
        type: ItemType.column,
        content: [
          {
            type: 'component',
            id: 'impairment-form',
            title: 'Set Impairment',
            header: {
              show: false,
            },
            isClosable: false,
            componentType: 'ImpairmentForm',
            componentState: undefined,
          } as ComponentItemConfig,
          {
            type: ItemType.stack,
            height: 70,
            header: { show: 'top', popout: false },
            content: [
              {
                title: 'Network Graph',
                header: { show: false, popout: false },
                type: 'component',
                isClosable: false,
                componentType: 'LiveGraph',
                componentState: undefined,
              } as ComponentItemConfig,
              {
                title: 'Network',
                header: { show: false, popout: false },
                type: 'component',
                isClosable: false,
                componentType: 'NetworkMonitor',
                componentState: undefined,
              } as ComponentItemConfig,
            ],
          },
        ],
      },
      {
        width: 70,
        type: ItemType.column,
        content: [
          {
            type: 'component',
            id: 'bearer-card',
            title: 'Bearer',
            header: {
              show: false,
            },
            isClosable: false,
            componentType: 'BearerCard',
            width: 30,
            componentState: undefined,
          } as ComponentItemConfig,
        ],
      },
      {
        width: 70,
        type: ItemType.column,
        content: [
          {
            title: 'Uplink Environment',
            id: 'uplink-env-card',
            header: { show: false, popout: false },
            type: 'component',
            isClosable: false,
            componentType: 'EnvironmentCard',
            componentState: EnvironmentType.UPLINK,
          } as ComponentItemConfig,
          {
            title: 'Downlink Environment',
            id: 'downlink-env-card',
            header: { show: false },
            type: 'component',
            isClosable: false,
            componentType: 'EnvironmentCard',
            componentState: EnvironmentType.DOWNLINK,
          } as ComponentItemConfig,
        ],
      },
    ],
  },
}

const impairmentGatewayLayout: Layout = {
  name: 'impairment-gateway',
  config: impairmentGatewayConfig,
}

export const predefinedLayouts: readonly Layout[] = [impairmentGatewayLayout]
export const predefinedLayoutNames: readonly string[] = predefinedLayouts.map(
  (layout) => layout.name,
)
