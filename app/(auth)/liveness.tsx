import { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useSettingsStore } from '../../stores/useSettingsStore'
import {
  CheckCircle,
  Eye,
  Sun,
  AlertTriangle,
  HelpCircle,
  X,
} from 'lucide-react-native'
import { STEPS } from '../../constants/constants'
import { CHALLENGES } from '../../constants/constants'

// const { width } = Dimensions.get('window')

type LivenessStep = 'info' | 'scanning' | 'success'



export default function LivenessScreen() {
  const [permission, requestPermission] = useCameraPermissions()
  const [step, setStep] = useState<LivenessStep>('info')
  const [currentStep, setCurrentStep] = useState(0)
  const [challengeIndex, setChallengeIndex] = useState(0)
  // const [lightingOk, setLightingOk] = useState(true)
  const [faceOk, setFaceOk] = useState(false)
  const setLivenessPassed = useSettingsStore((s) => s.setLivenessPassed)

  const scanAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (step === 'scanning') {
    //  scan line animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start()

      // simulate face detection after 1s
      const faceTimer = setTimeout(() => setFaceOk(true), 1000)

      // cycle challenges
      const challengeInterval = setInterval(() => {
        setChallengeIndex((prev) => (prev + 1) % CHALLENGES.length)
      }, 1500)

  
      const step1Timer = setTimeout(() => setCurrentStep(1), 2000)
      const step2Timer = setTimeout(() => setCurrentStep(2), 4000)

      // success
      const doneTimer = setTimeout(() => {
        setStep('success')
        setCurrentStep(3)
      }, 6000)

      return () => {
        clearTimeout(faceTimer)
        clearInterval(challengeInterval)
        clearTimeout(step1Timer)
        clearTimeout(step2Timer)
        clearTimeout(doneTimer)
      }
    }
  }, [step])

  const handleStart = async () => {
    if (!permission?.granted) {
      const result = await requestPermission()
      if (!result.granted) return
    }
    setStep('scanning')
    setCurrentStep(0)
    setChallengeIndex(0)
    setFaceOk(false)
    scanAnim.setValue(0)
  }

  const handleContinue = () => {
    setLivenessPassed(true)
    router.replace('/(tabs)')
  }

  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 280],
  })

  if (step === 'info') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  backgroundColor: '#00327D',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}
                >
                  T
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#111827',
                }}
              >
                Trackr
              </Text>
            </View>
          </View>



          {/* instructions and contents here  */}
          <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
          
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#586377',
                letterSpacing: 2,
                lineHeight: 15,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Security Verification
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 12,
                lineHeight: 40.5,
              }}
            >
              Biometric Liveness Verification
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#434653',
                lineHeight: 22,
                marginBottom: 24,
                paddingVertical: 20,
              }}
            >
              Please position your face within the frame. We need to verify
              your identity before accessing your financial data.
            </Text>

            {/* camera thingy */}
            <View
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                height: 427,
                marginBottom: 24,
                backgroundColor: '#1a1a2e',
              }}
            >
              {permission?.granted ? (
                <CameraView style={{ flex: 1 }} facing="front" />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1a1a2e',
                  }}
                >
                  <Eye size={40} color="rgba(255,255,255,0.3)" />
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: 12,
                      fontSize: 13,
                    }}
                  >
                    Camera permission required
                  </Text>
                </View>
              )}

              {/*  overlay */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  padding: 16,
                  borderRadius: 20,
                  margin:25,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#00327D',
                    marginBottom: 2,
                  }}
                >
                  Please blink twice
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: '#58637',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  If you're safe
                </Text>
              </View>
            </View>



            {/* main verification steps */}
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: 20,
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#1B3FA0',
                  marginBottom: 16,
                }}
              >
                Verification Steps
              </Text>
              {STEPS.map((s, i) => (
                <View
                  key={s.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 12,
                    marginBottom: i < STEPS.length - 1 ? 16 : 0,
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: i === 0 ? '#1B3FA0' : i === 1 ? '#1B3FA0' : '#E5E7EB',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i === 0 ? (
                      <CheckCircle size={16} color="#fff" />
                    ) : (
                      <Text
                        style={{
                          color: i === 2 ? '#9CA3AF' : '#fff',
                          fontWeight: '700',
                          fontSize: 13,
                        }}
                      >
                        {s.id}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: i === 2 ? '#9CA3AF' : '#111827',
                        marginBottom: 2,
                      }}
                    >
                      {s.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: i === 2 ? '#C4C9D4' : '#6B7280',
                        lineHeight: 18,
                      }}
                    >
                      {s.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Tips */}
            <View
              style={{
                backgroundColor: '#F8F9FF',
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <Sun size={16} color="#F59E0B" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: '#111827',
                  }}
                >
                  Tips for Success
                </Text>
              </View>
              {[
                'Ensure your face is well-lit from the front.',
                'Remove glasses or hats if verification fails.',
                'Maintain a neutral background.',
              ].map((tip, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 8,
                    marginBottom: i < 2 ? 8 : 0,
                  }}
                >
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 3,
                      backgroundColor: '#6B7280',
                      marginTop: 7,
                    }}
                  />
                  <Text
                    style={{ fontSize: 13, color: '#6B7280', flex: 1, lineHeight: 20 }}
                  >
                    {tip}
                  </Text>
                </View>
              ))}
            </View>

            {/* Status indicators */}
            <View style={{ gap: 8, marginBottom: 24 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  borderLeftWidth: 3,
                  borderLeftColor: '#10B981',
                  paddingLeft: 12,
                }}
              >
                <CheckCircle size={14} color="#10B981" />
                <Text
                  style={{ fontSize: 13, fontWeight: '600', color: '#10B981' }}
                >
                  Lighting conditions optimal
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  borderLeftWidth: 3,
                  borderLeftColor: '#F59E0B',
                  paddingLeft: 12,
                }}
              >
                <AlertTriangle size={14} color="#F59E0B" />
                <Text
                  style={{ fontSize: 13, fontWeight: '600', color: '#F59E0B' }}
                >
                  Face partially obscured
                </Text>
              </View>
            </View>

            {/* Buttons */}
            <TouchableOpacity
              onPress={handleStart}
              style={{
                backgroundColor: '#1B3FA0',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
                marginBottom: 12,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}
              >
                Start Verification
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#E8ECF8',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
                marginBottom: 16,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{ color: '#6B7280', fontSize: 16, fontWeight: '600' }}
              >
                Troubleshoot Camera
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 10,
                color: '#9CA3AF',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Protected by Trackr Encryption V1.0
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // Scanning screen
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: '#FFFFFF',
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
          >
            <X size={20} color="#111827" />
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
              Trackr
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#ECFDF5',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#10B981',
              }}
            />
            <Text
              style={{ fontSize: 11, fontWeight: '700', color: '#10B981' }}
            >
              SECURE LINK
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: '#1B3FA0',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Security Verification
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '800',
              color: '#111827',
              marginBottom: 10,
              lineHeight: 32,
            }}
          >
            Biometric Liveness Verification
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              lineHeight: 22,
              marginBottom: 20,
            }}
          >
            Please position your face within the frame.
          </Text>

          {/* Camera with detection overlay */}
          <View
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              height: 320,
              marginBottom: 20,
              backgroundColor: '#1a1a2e',
            }}
          >
            <CameraView style={{ flex: 1 }} facing="front" />

            {/* Scan line */}
            <Animated.View
              style={{
                position: 'absolute',
                left: 20,
                right: 20,
                height: 2,
                backgroundColor: '#10B981',
                opacity: 0.8,
                transform: [{ translateY: scanTranslate }],
              }}
            />

            {/* Corner brackets */}
            {[
              { top: 20, left: 20, borderTopWidth: 3, borderLeftWidth: 3 },
              { top: 20, right: 20, borderTopWidth: 3, borderRightWidth: 3 },
              { bottom: 80, left: 20, borderBottomWidth: 3, borderLeftWidth: 3 },
              { bottom: 80, right: 20, borderBottomWidth: 3, borderRightWidth: 3 },
            ].map((style, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  width: 24,
                  height: 24,
                  borderColor: '#1B3FA0',
                  ...style,
                }}
              />
            ))}

            {/* Face detection box */}
            {faceOk && (
              <View
                style={{
                  position: 'absolute',
                  top: 40,
                  left: 60,
                  right: 60,
                  bottom: 100,
                  borderWidth: 1.5,
                  borderColor: '#10B981',
                  borderRadius: 4,
                }}
              />
            )}

            {/* Status badges */}
            <View
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                right: 16,
                flexDirection: 'row',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: '#10B981',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 999,
                }}
              >
                <Sun size={11} color="#fff" />
                <Text
                  style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}
                >
                  Lighting conditions optimal
                </Text>
              </View>
              {!faceOk && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: '#F59E0B',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 999,
                  }}
                >
                  <AlertTriangle size={11} color="#fff" />
                  <Text
                    style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}
                  >
                    Face partially obscured
                  </Text>
                </View>
              )}
            </View>

            {/* Challenge pill */}
            <View
              style={{
                position: 'absolute',
                bottom: 16,
                left: 20,
                right: 20,
                backgroundColor: 'rgba(255,255,255,0.92)',
                borderRadius: 50,
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <Eye size={20} color="#1B3FA0" />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#1B3FA0',
                }}
              >
                {CHALLENGES[challengeIndex]}
              </Text>
            </View>
          </View>

          {/* Progress Steps */}
          <View style={{ gap: 12, marginBottom: 24 }}>
            {[
              {
                title: 'Frame Detection',
                desc: 'Subject centered within operational parameters.',
              },
              {
                title: 'Liveness Challenge',
                desc: 'Detecting active biometric movement...',
              },
              {
                title: 'Ledger Encryption',
                desc: 'Finalizing cryptographic verification link.',
              },
            ].map((s, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 16,
                  opacity: i > currentStep ? 0.4 : 1,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor:
                      i < currentStep
                        ? '#1B3FA0'
                        : i === currentStep
                        ? '#EEF2FF'
                        : '#F3F4F6',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i < currentStep ? (
                    <CheckCircle size={18} color="#fff" />
                  ) : i === currentStep ? (
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: '#1B3FA0',
                        borderTopColor: 'transparent',
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: '#D1D5DB',
                      }}
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: 2,
                    }}
                  >
                    {s.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>
                    {s.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Buttons */}
          {step === 'success' ? (
            <TouchableOpacity
              onPress={handleContinue}
              style={{
                backgroundColor: '#10B981',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
                marginBottom: 12,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}
              >
                Continue to Trackr
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: '#1B3FA0',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 12,
              }}
              activeOpacity={0.8}
            >
              <HelpCircle size={18} color="#FFFFFF" />
              <Text
                style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}
              >
                Troubleshoot
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => setStep('info')}
            style={{
              backgroundColor: '#E8ECF8',
              borderRadius: 14,
              paddingVertical: 18,
              alignItems: 'center',
              marginBottom: 16,
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{ color: '#6B7280', fontSize: 16, fontWeight: '600' }}
            >
              Cancel Verification
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              color: '#9CA3AF',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Protected by Trackr Encryption V1.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}