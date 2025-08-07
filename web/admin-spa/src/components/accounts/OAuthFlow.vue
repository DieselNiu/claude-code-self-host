<template>
  <div class="space-y-6">
    <!-- Claude OAuth流程 -->
    <div v-if="platform === 'claude'">
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <div class="flex items-start gap-4">
          <div
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500"
          >
            <i class="fas fa-link text-white" />
          </div>
          <div class="flex-1">
            <h4 class="mb-3 font-semibold text-blue-900">Claude 账户授权</h4>
            <p class="mb-4 text-sm text-blue-800">请按照以下步骤完成 Claude 账户的授权：</p>

            <div class="space-y-4">
              <!-- 步骤1: 生成授权链接 -->
              <div class="rounded-lg border border-blue-300 bg-white/80 p-4">
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
                  >
                    1
                  </div>
                  <div class="flex-1">
                    <p class="mb-2 font-medium text-blue-900">点击下方按钮生成授权链接</p>
                    <button
                      v-if="!authUrl"
                      class="btn btn-primary px-4 py-2 text-sm"
                      :disabled="loading"
                      @click="generateAuthUrl"
                    >
                      <i v-if="!loading" class="fas fa-link mr-2" />
                      <div v-else class="loading-spinner mr-2" />
                      {{ loading ? '生成中...' : '生成授权链接' }}
                    </button>
                    <div v-else class="space-y-3">
                      <div class="flex items-center gap-2">
                        <input
                          class="form-input flex-1 bg-gray-50 font-mono text-xs"
                          readonly
                          type="text"
                          :value="authUrl"
                        />
                        <button
                          class="rounded-lg bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200"
                          title="复制链接"
                          @click="copyAuthUrl"
                        >
                          <i :class="copied ? 'fas fa-check text-green-500' : 'fas fa-copy'" />
                        </button>
                      </div>
                      <button
                        class="text-xs text-blue-600 hover:text-blue-700"
                        @click="regenerateAuthUrl"
                      >
                        <i class="fas fa-sync-alt mr-1" />重新生成
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 步骤2: 访问链接并授权 -->
              <div class="rounded-lg border border-blue-300 bg-white/80 p-4">
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
                  >
                    2
                  </div>
                  <div class="flex-1">
                    <p class="mb-2 font-medium text-blue-900">在浏览器中打开链接并完成授权</p>
                    <p class="mb-2 text-sm text-blue-700">
                      请在新标签页中打开授权链接，登录您的 Claude 账户并授权。
                    </p>
                    <div class="rounded border border-yellow-300 bg-yellow-50 p-3">
                      <p class="text-xs text-yellow-800">
                        <i class="fas fa-exclamation-triangle mr-1" />
                        <strong>注意：</strong
                        >如果您设置了代理，请确保浏览器也使用相同的代理访问授权页面。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 步骤3: 输入授权码 -->
              <div class="rounded-lg border border-blue-300 bg-white/80 p-4">
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
                  >
                    3
                  </div>
                  <div class="flex-1">
                    <p class="mb-2 font-medium text-blue-900">输入 Authorization Code</p>
                    <p class="mb-3 text-sm text-blue-700">
                      授权完成后，页面会显示一个
                      <strong>Authorization Code</strong>，请将其复制并粘贴到下方输入框：
                    </p>
                    <div class="space-y-3">
                      <div>
                        <label class="mb-2 block text-sm font-semibold text-gray-700">
                          <i class="fas fa-key mr-2 text-blue-500" />Authorization Code
                        </label>
                        <textarea
                          v-model="authCode"
                          class="form-input w-full resize-none font-mono text-sm"
                          placeholder="粘贴从Claude页面获取的Authorization Code..."
                          rows="3"
                        />
                      </div>
                      <p class="mt-2 text-xs text-gray-500">
                        <i class="fas fa-info-circle mr-1" />
                        请粘贴从Claude页面复制的Authorization Code
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gemini OAuth流程 -->
    <div v-else-if="platform === 'gemini'">
      <div class="rounded-lg border border-green-200 bg-green-50 p-6">
        <div class="flex items-start gap-4">
          <div
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-500"
          >
            <i class="fas fa-robot text-white" />
          </div>
          <div class="flex-1">
            <h4 class="mb-3 font-semibold text-green-900">Gemini 账户授权</h4>
            <p class="mb-4 text-sm text-green-800">请按照以下步骤完成 Gemini 账户的授权：</p>

            <div class="space-y-4">
              <!-- 步骤1: 生成授权链接 -->
              <div class="rounded-lg border border-green-300 bg-white/80 p-4">
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
                  >
                    1
                  </div>
                  <div class="flex-1">
                    <p class="mb-2 font-medium text-green-900">点击下方按钮生成授权链接</p>
                    <button
                      v-if="!authUrl"
                      class="btn btn-primary px-4 py-2 text-sm"
                      :disabled="loading"
                      @click="generateAuthUrl"
                    >
                      <i v-if="!loading" class="fas fa-link mr-2" />
                      <div v-else class="loading-spinner mr-2" />
                      {{ loading ? '生成中...' : '生成授权链接' }}
                    </button>
                    <div v-else class="space-y-3">
                      <div class="flex items-center gap-2">
                        <input
                          class="form-input flex-1 bg-gray-50 font-mono text-xs"
                          readonly
                          type="text"
                          :value="authUrl"
                        />
                        <button
                          class="rounded-lg bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200"
                          title="复制链接"
                          @click="copyAuthUrl"
                        >
                          <i :class="copied ? 'fas fa-check text-green-500' : 'fas fa-copy'" />
                        </button>
                      </div>
                      <button
                        class="text-xs text-green-600 hover:text-green-700"
                        @click="regenerateAuthUrl"
                      >
                        <i class="fas fa-sync-alt mr-1" />重新生成
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 步骤2: 操作说明 -->
              <div class="rounded-lg border border-green-300 bg-white/80 p-4">
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
                  >
                    2
                  </div>
                  <div class="flex-1">
                    <p class="mb-2 font-medium text-blue-900">在浏览器中打开链接并完成授权</p>
                    <p class="mb-2 text-sm text-blue-700">
                      请在新标签页中打开授权链接，登录您的 Gemini 账户并授权。
                    </p>
                    <div class="rounded border border-yellow-300 bg-yellow-50 p-3">
                      <p class="text-xs text-yellow-800">
                        <i class="fas fa-exclamation-triangle mr-1" />
                        <strong>注意：</strong
                        >如果您设置了代理，请确保浏览器也使用相同的代理访问授权页面。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 步骤3: 输入授权码 -->
              <div class="rounded-lg border border-green-300 bg-white/80 p-4">
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
                  >
                    3
                  </div>
                  <div class="flex-1">
                    <p class="mb-2 font-medium text-green-900">输入 Authorization Code</p>
                    <p class="mb-3 text-sm text-green-700">
                      授权完成后，页面会显示一个 Authorization Code，请将其复制并粘贴到下方输入框：
                    </p>
                    <div class="space-y-3">
                      <div>
                        <label class="mb-2 block text-sm font-semibold text-gray-700">
                          <i class="fas fa-key mr-2 text-green-500" />Authorization Code
                        </label>
                        <textarea
                          v-model="authCode"
                          class="form-input w-full resize-none font-mono text-sm"
                          placeholder="粘贴从Gemini页面获取的Authorization Code..."
                          rows="3"
                        />
                      </div>
                      <div class="mt-2 space-y-1">
                        <p class="text-xs text-gray-600">
                          <i class="fas fa-check-circle mr-1 text-green-500" />
                          请粘贴从Gemini页面复制的Authorization Code
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-3 pt-4">
      <button
        class="flex-1 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
        type="button"
        @click="$emit('back')"
      >
        上一步
      </button>
      <button
        class="btn btn-primary flex-1 px-6 py-3 font-semibold"
        :disabled="!canExchange || exchanging"
        type="button"
        @click="exchangeCode"
      >
        <div v-if="exchanging" class="loading-spinner mr-2" />
        {{ exchanging ? '验证中...' : '完成授权' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { showToast } from '@/utils/toast'
import { useAccountsStore } from '@/stores/accounts'

const props = defineProps({
  platform: {
    type: String,
    required: true
  },
  proxy: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['success', 'back'])

const accountsStore = useAccountsStore()

// 状态
const loading = ref(false)
const exchanging = ref(false)
const authUrl = ref('')
const authCode = ref('')
const copied = ref(false)
const sessionId = ref('') // 保存sessionId用于后续交换

// 计算是否可以交换code
const canExchange = computed(() => {
  return authUrl.value && authCode.value.trim()
})

// 监听授权码输入，自动提取URL中的code参数
watch(authCode, (newValue) => {
  if (!newValue || typeof newValue !== 'string') return

  const trimmedValue = newValue.trim()

  // 如果内容为空，不处理
  if (!trimmedValue) return

  // 检查是否是 URL 格式（包含 http:// 或 https://）
  const isUrl = trimmedValue.startsWith('http://') || trimmedValue.startsWith('https://')

  // 如果是 URL 格式
  if (isUrl) {
    // 检查是否是正确的 localhost:45462 开头的 URL
    if (trimmedValue.startsWith('http://localhost:45462')) {
      try {
        const url = new URL(trimmedValue)
        const code = url.searchParams.get('code')

        if (code) {
          // 成功提取授权码
          authCode.value = code
          showToast('成功提取授权码！', 'success')
          console.log('Successfully extracted authorization code from URL')
        } else {
          // URL 中没有 code 参数
          showToast('URL 中未找到授权码参数，请检查链接是否正确', 'error')
        }
      } catch (error) {
        // URL 解析失败
        console.error('Failed to parse URL:', error)
        showToast('链接格式错误，请检查是否为完整的 URL', 'error')
      }
    } else if (props.platform === 'gemini') {
      // Gemini 平台可能使用不同的回调URL
      // 尝试从任何URL中提取code参数
      try {
        const url = new URL(trimmedValue)
        const code = url.searchParams.get('code')

        if (code) {
          authCode.value = code
          showToast('成功提取授权码！', 'success')
        }
      } catch (error) {
        // 不是有效的URL，保持原值
      }
    } else {
      // 错误的 URL（不是 localhost:45462 开头）
      showToast('请粘贴以 http://localhost:45462 开头的链接', 'error')
    }
  }
  // 如果不是 URL，保持原值（兼容直接输入授权码）
})

// 生成授权URL
const generateAuthUrl = async () => {
  loading.value = true
  try {
    const proxyConfig = props.proxy?.enabled
      ? {
          proxy: {
            type: props.proxy.type,
            host: props.proxy.host,
            port: parseInt(props.proxy.port),
            username: props.proxy.username || null,
            password: props.proxy.password || null
          }
        }
      : {}

    if (props.platform === 'claude') {
      const result = await accountsStore.generateClaudeAuthUrl(proxyConfig)
      authUrl.value = result.authUrl
      sessionId.value = result.sessionId
    } else if (props.platform === 'gemini') {
      const result = await accountsStore.generateGeminiAuthUrl(proxyConfig)
      authUrl.value = result.authUrl
      sessionId.value = result.sessionId
    }
  } catch (error) {
    showToast(error.message || '生成授权链接失败', 'error')
  } finally {
    loading.value = false
  }
}

// 重新生成授权URL
const regenerateAuthUrl = () => {
  authUrl.value = ''
  authCode.value = ''
  generateAuthUrl()
}

// 复制授权URL
const copyAuthUrl = async () => {
  try {
    await navigator.clipboard.writeText(authUrl.value)
    copied.value = true
    showToast('链接已复制', 'success')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    // 降级方案
    const input = document.createElement('input')
    input.value = authUrl.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    showToast('链接已复制', 'success')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// 交换授权码
const exchangeCode = async () => {
  if (!canExchange.value) return

  exchanging.value = true
  try {
    let data = {}

    if (props.platform === 'claude') {
      // Claude使用sessionId和callbackUrl（即授权码）
      data = {
        sessionId: sessionId.value,
        callbackUrl: authCode.value.trim()
      }
    } else if (props.platform === 'gemini') {
      // Gemini使用code和sessionId
      data = {
        code: authCode.value.trim(),
        sessionId: sessionId.value
      }
    }

    // 添加代理配置（如果启用）
    if (props.proxy?.enabled) {
      data.proxy = {
        type: props.proxy.type,
        host: props.proxy.host,
        port: parseInt(props.proxy.port),
        username: props.proxy.username || null,
        password: props.proxy.password || null
      }
    }

    let tokenInfo
    if (props.platform === 'claude') {
      tokenInfo = await accountsStore.exchangeClaudeCode(data)
    } else if (props.platform === 'gemini') {
      tokenInfo = await accountsStore.exchangeGeminiCode(data)
    }

    emit('success', tokenInfo)
  } catch (error) {
    showToast(error.message || '授权失败，请检查授权码是否正确', 'error')
  } finally {
    exchanging.value = false
  }
}
</script>
