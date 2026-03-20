-- Whatsnext Backend Database Schema

-- 1. Leads Table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    company_size TEXT,
    sector TEXT,
    message TEXT,
    lead_source TEXT DEFAULT 'web_form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. AI Scans Table
CREATE TABLE ai_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT,
    sector TEXT,
    employees TEXT,
    ai_usage_level TEXT,
    automation_interest TEXT,
    biggest_problem TEXT,
    email TEXT,
    score INTEGER,
    level TEXT,
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CMS Tables
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    category TEXT,
    content TEXT,
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    company TEXT,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    prompt_text TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Analytics Events
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL, -- page_visit, scan_completed, etc.
    page_path TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ROI Calculations Table
CREATE TABLE roi_calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    sector TEXT,
    employees TEXT,
    avg_salary INTEGER,
    hours_spent_email NUMERIC,
    hours_spent_reporting NUMERIC,
    hours_spent_admin NUMERIC,
    hours_spent_research NUMERIC,
    weekly_hours_saved NUMERIC,
    yearly_hours_saved NUMERIC,
    roi_value NUMERIC,
    ai_opportunities JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. AI Reports Table
CREATE TABLE ai_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    scan_score INTEGER,
    roi_estimate NUMERIC,
    summary TEXT,
    top_opportunities JSONB,
    recommended_tools JSONB,
    implementation_roadmap JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
