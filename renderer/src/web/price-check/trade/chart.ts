// A chart's region is what it is priced on, and the trade site models each one
// as its own `type` id behind a per-base discriminator, the same shape
// transfigured gems use. The generic base type is also searchable on its own.
//
// Source: https://www.pathofexile.com/api/trade/data/items
export interface ChartRegion { type: string, disc: string }

export const CHART_REGIONS: Record<string, ChartRegion> = {
  'Abyssal Plain': { type: 'AbyssalPlain', disc: 'chart_sandy_seabed' },
  'Anchorfield': { type: 'Anchorfield', disc: 'chart_sandy_seabed' },
  'Brine King\'s Domain': { type: 'BrineKingsDomain', disc: 'chart_coral_reef' },
  'Clam-infested Shelf': { type: 'ClamInfestedShelf', disc: 'chart_coral_reef' },
  'Diving Shoals': { type: 'DivingShoals', disc: 'chart_coral_reef' },
  'Eldritch Depths': { type: 'EldritchDepths', disc: 'chart_coral_forest' },
  'Hazardous Depths': { type: 'HazardousDepths', disc: 'chart_sandy_seabed' },
  'Infested Bathyspheres': { type: 'InfestedBathyspheres', disc: 'chart_sandy_seabed' },
  'Kishara\'s Rest': { type: 'KisharasRest', disc: 'chart_sandy_seabed' },
  'Lost Ruins': { type: 'LostRuins', disc: 'chart_coral_forest' },
  'Pelagic Abyss': { type: 'PelagicAbyss', disc: 'chart_coral_forest' },
  'Sea Pillars': { type: 'SeaPillars', disc: 'chart_coral_forest' },
  'Seafloor Ridges': { type: 'SeafloorRidges', disc: 'chart_coral_reef' },
  'Sunken Totems': { type: 'SunkenTotems', disc: 'chart_coral_reef' },
  'Undersea Groves': { type: 'UnderseaGroves', disc: 'chart_coral_forest' },
  'Unremarkable Seabed': { type: 'UnremarkableSeabed', disc: 'chart_sandy_seabed' }
}
