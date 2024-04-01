import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { News } from './src/domains/models/news';
import { useEffect, useState } from 'react';
import { makeGetLatestNewsByCountry } from './src/main/factories/get-latest-news-by-country';
import * as Location from 'expo-location';
import { makeGetCountryUserByLatAndLng } from './src/main/factories/get-country-user-by-lat-and-lng';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';

const getLatestNewsByCountry = makeGetLatestNewsByCountry()
const getCountryUserByLatAndLng = makeGetCountryUserByLatAndLng()

async function updatePosition(): Promise<(Location.LocationObject & {
  countryName: string
}) | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  let location: Location.LocationObject | null = null;
  try {
    location = await Location.getCurrentPositionAsync({});
  } catch (error) {
    const latestLocation = await Location.getLastKnownPositionAsync({});
    if (!latestLocation) {
      return null;
    }
  }
  if (!location) {
    return null;
  }
  const country = await getCountryUserByLatAndLng.get(location.coords.latitude.toString(), location.coords.longitude.toString())
  return { ...location, countryName: country.country };
}
export default function App() {
  const [news, setNews] = useState<News[]>([])
  const [location, setLocation] = useState<Location.LocationObject & {
    countryName: string
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const news = await getLatestNewsByCountry.get(location?.countryName || 'br')
      setNews(news)
      setLoading(false)
    })()
  }, [location?.countryName])

  useEffect(() => {
    (async () => {
      setLoading(true)
      const location = await updatePosition()
      if (!location) {
        setErrorMsg('Você precisa permitir a localização para ver as notícias da sua região.');
        return;
      }
      setErrorMsg(null)
      setLocation(location);
      setLoading(false)
    })();
  }, []);
  return (
    <SafeAreaProvider>
      <View style={tw`flex-1 h-full`}>
        <View style={tw`bg-[#6259DE] p-4`}>
          <Text style={tw`text-2xl text-center text-white pt-5`}>
            Últimas Notícias
          </Text>
        </View>
        <View>
          {errorMsg ? <Text>{errorMsg}</Text> : null}
          {location ? (
            <Text style={tw`text-center text-gray-500 p-4`}>
              Você está em: {location.countryName}
            </Text>
          ) : null}
        </View>
        <Button title={
          loading ? 'Carregando...' : 'Atualizar Notícias'
        } onPress={async () => {
          setLoading(true)
          const location = await updatePosition()
          if (!location) {
            setErrorMsg('Você precisa permitir a localização para ver as notícias da sua região.');
            return;
          }
          setLocation(location);
          setErrorMsg(null)
          setLoading(false)
        }} />
        <ScrollView style={tw`flex-1 p-4 w-full h-full bg-[#121212]`}>
          {news.map((news, index) => (
            <View key={index} style={tw`border-b border-gray-200 p-4`}>
              {
                news.urlToImage ? <Image style={tw`w-full h-36`} source={{ uri: news.urlToImage }} /> : null
              }
              <Text style={tw`text-lg font-bold text-white`}>{news.title}</Text>
              <Text style={tw`text-sm text-gray-500 text-white`}>{news.description}</Text>
              <Button title="Ver mais" onPress={() => {
                WebBrowser.openBrowserAsync(news.url)
              }} />
            </View>
          ))}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
